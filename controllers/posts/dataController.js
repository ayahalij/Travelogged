const Post = require('../../models/post');

const dataController = {
  index: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const posts = await Post.find({ author: req.user._id })
        .populate('author', 'name email')
        .populate('comments.commenter', 'name');
      
      res.locals.data.posts = posts;
      next();
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(400).json({ message: error.message });
    }
  },

  create: async (req, res, next) => {
    try {
      console.log('=== POST CREATION STARTED ===');
      console.log('Authenticated User:', req.user ? req.user._id : 'Not found');
      
      if (!req.user) {
        throw new Error('Authentication required');
      }

      if (!req.body || typeof req.body !== 'object') {
        throw new Error('Invalid post data');
      }

      const postData = {
        ...req.body,
        author: req.user._id
      };

      console.log('Post data before creation:', postData);

      const newPost = await Post.create(postData);
      
      // Add post to user's posts array
      req.user.posts.push(newPost._id);
      await req.user.save();

      res.locals.data.post = newPost;
      console.log('Post created successfully:', newPost._id);
      
      next();
    } catch (error) {
      console.error('Post creation failed:', error);
      res.status(400).json({ 
        message: error.message,
        details: error.errors ? Object.values(error.errors).map(e => e.message) : []
      });
    }
  },

  show: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id)
        .populate('author', 'name email')
        .populate('comments.commenter', 'name');
      
      if (!post) {
        throw new Error('Post not found');
      }

      res.locals.data.post = post;
      next();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  update: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error('Authentication required');
      }

      const post = await Post.findOneAndUpdate(
        { _id: req.params.id, author: req.user._id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!post) {
        throw new Error('Post not found or unauthorized');
      }

      res.locals.data.post = post;
      next();
    } catch (error) {
      res.status(400).json({ 
        message: error.message,
        details: error.errors ? Object.values(error.errors).map(e => e.message) : []
      });
    }
  },

  destroy: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error('Authentication required');
      }

      const post = await Post.findOneAndDelete({
        _id: req.params.id,
        author: req.user._id
      });

      if (!post) {
        throw new Error('Post not found or unauthorized');
      }

      // Remove post from user's posts array
      req.user.posts.pull(post._id);
      await req.user.save();

      next();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Additional helper methods
  likePost: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error('Authentication required');
      }

      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likes: req.user._id } },
        { new: true }
      );

      res.locals.data.post = post;
      next();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  addComment: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error('Authentication required');
      }

      const comment = {
        commenter: req.user._id,
        content: req.body.content
      };

      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: comment } },
        { new: true }
      );

      res.locals.data.post = post;
      next();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = dataController;