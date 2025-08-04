const Post = require('../../models/post')

exports.index = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('author', 'name')
      .populate('likes', 'name') // Add this to get likes data
      .sort({ createdAt: -1 }) // Sort by newest first
      .exec()
    
    console.log('Current user in index:', req.author ? req.author._id : 'No user');
    console.log('Posts loaded:', posts.length);
    
    res.render('posts/Index', { 
      posts, 
      userId: req.author ? req.author._id.toString() : null 
    })
  } catch (error) {
    console.error('Error loading posts:', error);
    res.status(500).send('Error loading posts')
  }
}

// REMOVE THIS METHOD - it's conflicting with dataController.show
// The dataController.show will provide the post data in res.locals.data.post
exports.show = (req, res) => {
  // Use the post data from dataController.show
  const post = res.locals.data.post;
  
  if (!post) {
    return res.status(404).send('Post not found')
  }
  
  console.log('Post author ID:', post.author._id ? post.author._id.toString() : 'No author ID');
  console.log('Current user ID:', req.author ? req.author._id.toString() : 'No user');
  console.log('User can edit?', req.author && post.author._id && post.author._id.toString() === req.author._id.toString());
  
  res.render('posts/Show', { 
    post, 
    userId: req.author ? req.author._id.toString() : null 
  })
}

exports.newView = (req, res) => {
  res.render('posts/New', { userId: req.author ? req.author._id.toString() : null })
}

exports.edit = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).send('Post not found')
    }
    
    // Check if current user is the author
    if (post.author.toString() !== req.author._id.toString()) {
      return res.status(403).send('Not authorized to edit this post')
    }
    
    res.render('posts/Edit', { 
      post, 
      userId: req.author._id.toString() 
    })
  } catch (error) {
    console.error('Error loading edit form:', error);
    res.status(500).send('Error loading edit form')
  }
}

exports.redirectHome = (req, res) => {
  res.redirect('/posts')
}

exports.redirectShow = (req, res) => {
  res.redirect(`/posts/${req.params.id}`)
}