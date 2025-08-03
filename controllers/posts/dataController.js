const Post = require('../../models/post')

const dataController = {}

dataController.index = async (req, res, next) => {
  try {
    const author = await req.author.populate('posts')
    res.locals.data.posts = author.posts
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

dataController.create = async (req, res, next) => {
  try {
    console.log('=== POST REQUEST DEBUG ===');
    console.log('Request method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request headers:', req.headers);
    console.log('Raw req.body:', req.body);
    console.log('Type of req.body:', typeof req.body);
    console.log('req.body is null?', req.body === null);
    console.log('req.body is undefined?', req.body === undefined);
    console.log('Object.keys(req.body):', req.body ? Object.keys(req.body) : 'N/A');
    console.log('=== END DEBUG ===');
    
    // Check if req.body exists and is an object
    if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
      throw new Error('No form data received');
    }
    
    // Create a safe copy and add author
    const postData = { ...req.body };
    postData.author = req.author._id;
    
    console.log('Final post data:', postData);
    
    res.locals.data.post = await Post.create(postData);
    req.author.posts.addToSet({ _id: res.locals.data.post._id });
    await req.author.save();
    
    console.log('Post created successfully:', res.locals.data.post._id);
    next();
  } catch (error) {
    console.error('Post creation error:', error.message);
    res.status(400).send({ message: error.message });
  }
}

dataController.show = async (req, res, next) => {
  try {
    res.locals.data.post = await Post.findById(req.params.id)
      .populate('likes', 'username')
      .populate('comments.commenter', 'username') // Populate the commenter field in embedded comments
      .exec();
      
    if (!res.locals.data.post) {
      throw new Error(`Could not locate a post with the id ${req.params.id}`)
    }
    
    // Sort comments by newest first (since they're embedded)
    if (res.locals.data.post.comments) {
      res.locals.data.post.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// Add these new methods to your dataController object:
dataController.createComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).send({ message: 'Comment content is required' });
    }

    // Create new comment object
    const newComment = {
      commenter: req.author._id,
      content: content.trim(),
      createdAt: new Date()
    };

    // Add comment to post using $push
    await Post.findByIdAndUpdate(req.params.id, {
      $push: { comments: newComment }
    });

    console.log('Comment created successfully');
    next();
  } catch (error) {
    console.error('Comment creation error:', error);
    res.status(500).send({ message: 'Error creating comment' });
  }
};

dataController.deleteComment = async (req, res, next) => {
  try {
    // Find the post and the specific comment
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    // Find the comment within the post
    const comment = post.comments.id(req.params.commentId);
    
    if (!comment) {
      return res.status(404).send({ message: 'Comment not found' });
    }

    const isCommentAuthor = comment.commenter.toString() === req.author._id.toString();
    const isPostAuthor = post.author.toString() === req.author._id.toString();
    
    if (!isCommentAuthor && !isPostAuthor) {
      return res.status(403).send({ message: 'Not authorized to delete this comment' });
    }

    // Remove the comment using pull
    await Post.findByIdAndUpdate(req.params.postId, {
      $pull: { comments: { _id: req.params.commentId } }
    });

    console.log('Comment deleted successfully');
    next();
  } catch (error) {
    console.error('Comment deletion error:', error);
    res.status(500).send({ message: 'Error deleting comment' });
  }
};

dataController.update = async (req, res, next) => {
  try {
    console.log('=== UPDATE REQUEST DEBUG ===');
    console.log('Request method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Post ID:', req.params.id);
    console.log('Raw req.body:', req.body);
    console.log('Author ID:', req.author ? req.author._id : 'No author');
    
    // Check if we have data to update
    if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
      throw new Error('No update data received');
    }
    
    // Find the post first to check if it exists and if user owns it
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
      throw new Error('Post not found');
    }
    
    console.log('Existing post author:', existingPost.author);
    console.log('Existing post author type:', typeof existingPost.author);
    console.log('Current user ID:', req.author._id);
    console.log('Current user ID type:', typeof req.author._id);
    
    // Convert both to strings for comparison
    const postAuthorId = existingPost.author.toString();
    const currentUserId = req.author._id.toString();
    
    console.log('Post author ID (string):', postAuthorId);
    console.log('Current user ID (string):', currentUserId);
    console.log('IDs match?', postAuthorId === currentUserId);
    
    // Check if the current user is the author of the post
    if (postAuthorId !== currentUserId) {
      throw new Error('Not authorized to edit this post');
    }
    
    res.locals.data.post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    console.log('Post updated successfully:', res.locals.data.post._id);
    next();
  } catch (error) {
    console.error('Post update error:', error.message);
    res.status(400).send({ message: error.message });
  }
}

dataController.destroy = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");

    if (!post) {
      console.log("Post not found");
      return res.status(404).send({ message: "Post not found" });
    }

    if (!req.author) {
      console.log("User not authenticated");
      return res.status(401).send({ message: "Unauthorized" });
    }

    // Compare author ID
    if (post.author._id.toString() !== req.author._id.toString()) {
      console.log("User not authorized to delete this post");
      return res.status(403).send({ message: "Unauthorized: You are not the post creator" });
    }

    await post.deleteOne(); // safer than findByIdAndDelete
    console.log("Post deleted successfully");
    next(); // Go to redirect
  } catch (error) {
    console.error("Post delete error:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

// Toggle like functionality
dataController.toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    const userId = req.author._id.toString();

    // Check if user already liked the post
    const likedIndex = post.likes.findIndex(id => id.toString() === userId);

    if (likedIndex === -1) {
      // Not liked yet, add like
      post.likes.push(userId);
      console.log(`User ${userId} liked post ${req.params.id}`);
    } else {
      // Already liked, remove like (unlike)
      post.likes.splice(likedIndex, 1);
      console.log(`User ${userId} unliked post ${req.params.id}`);
    }

    await post.save();
    
    // Store updated post in res.locals for the next middleware
    res.locals.data.post = post;
    
    next(); // call next to proceed to redirect
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

module.exports = dataController