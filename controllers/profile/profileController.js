// controllers/auth/profileController.js
const Author = require('../../models/auth')
const Post = require('../../models/post')

const profileController = {}

/// Get profile data including user's posts, liked posts, and comments
profileController.getProfile = async (req, res, next) => {
  try {
    const userId = req.author._id;

    // Get user's own posts
    const userPosts = await Post.find({ author: userId })
      .populate('author', 'name')
      .populate('likes', 'name')
      .sort({ createdAt: -1 });

    // Get posts that the user has liked
    const likedPosts = await Post.find({ likes: userId })
      .populate('author', 'name')
      .populate('likes', 'name')
      .sort({ createdAt: -1 });

    // Get posts where the user has commented
    const postsWithUserComments = await Post.find({ 
      'comments.commenter': userId 
    })
      .populate('author', 'name')
      .populate('comments.commenter', 'name')
      .sort({ 'comments.createdAt': -1 });

    // Extract user's comments with post context
    const userComments = [];
    postsWithUserComments.forEach(post => {
      post.comments.forEach(comment => {
        if (comment.commenter._id.toString() === userId.toString()) {
          userComments.push({
            _id: comment._id,
            content: comment.content,
            createdAt: comment.createdAt,
            post: {
              _id: post._id,
              title: post.title,
              author: post.author
            }
          });
        }
      });
    });

    // Sort comments by most recent first
    userComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // ✅ Initialize res.locals.data before assigning
    res.locals.data = {
      user: req.author,
      userPosts,
      likedPosts,
      userComments
    };

    console.log('Profile data loaded:');
    console.log('- User:', req.author.name);
    console.log('- User posts:', userPosts.length);
    console.log('- Liked posts:', likedPosts.length);
    console.log('- User comments:', userComments.length);

    next();
  } catch (error) {
    console.error('Profile data error:', error);
    res.status(500).send({ message: 'Error loading profile data' });
  }
};


// NEW: Get public profile data for any user
profileController.getPublicProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId
    
    // Get the user info
    const user = await Author.findById(userId).select('name email bio')
    
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    
    // Get user's posts
    const userPosts = await Post.find({ author: userId })
      .populate('author', 'name')
      .populate('likes', 'name')
      .sort({ createdAt: -1 })
    
    // Get posts that the user has liked
    const likedPosts = await Post.find({ likes: userId })
      .populate('author', 'name')
      .populate('likes', 'name')
      .sort({ createdAt: -1 })
    
    // Get posts where the user has commented
    const postsWithUserComments = await Post.find({ 
      'comments.commenter': userId 
    })
    .populate('author', 'name')
    .populate('comments.commenter', 'name')
    .sort({ 'comments.createdAt': -1 })
    
    // Extract user's comments with post context
    const userComments = [];
    postsWithUserComments.forEach(post => {
      post.comments.forEach(comment => {
        if (comment.commenter._id.toString() === userId.toString()) {
          userComments.push({
            _id: comment._id,
            content: comment.content,
            createdAt: comment.createdAt,
            post: {
              _id: post._id,
              title: post.title,
              author: post.author
            }
          });
        }
      });
    });
    
    // Sort comments by most recent first
    userComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    // Store data for the view
    res.locals.data.user = user
    res.locals.data.userPosts = userPosts
    res.locals.data.likedPosts = likedPosts
    res.locals.data.userComments = userComments
    res.locals.data.isOwnProfile = req.author && req.author._id.toString() === userId.toString()
    
    console.log('Public profile data loaded:')
    console.log('- User:', user.name)
    console.log('- User posts:', userPosts.length)
    console.log('- Liked posts:', likedPosts.length)
    console.log('- User comments:', userComments.length)
    console.log('- Is own profile:', res.locals.data.isOwnProfile)
    
    next();
  } catch (error) {
    console.error('Public profile data error:', error)
    res.status(500).send({ message: 'Error loading profile data' })
  }
};

// Update user profile (name, email, bio)
profileController.updateProfile = async (req, res, next) => {
  try {
    const userId = req.author._id
    const { name, email, bio } = req.body
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).send({ message: 'Name and email are required' })
    }
    
    // Check if email is already taken by another user
    const existingUser = await Author.findOne({ 
      email: email, 
      _id: { $ne: userId } 
    })
    
    if (existingUser) {
      return res.status(400).send({ message: 'Email is already taken by another user' })
    }
    
    // Update the user
    const updatedUser = await Author.findByIdAndUpdate(
      userId,
      { name, email, bio: bio || '' },
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' })
    }
    
    console.log('Profile updated for:', updatedUser.name)
    req.author = updatedUser
    res.locals.data.user = updatedUser
    
    next()
  } 
  catch (error) {
    console.error('Profile update error:', error)
    res.status(400).send({ message: error.message })
  }
}

module.exports = profileController