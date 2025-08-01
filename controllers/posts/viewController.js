const Post = require('../../models/post')

exports.index = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('author', 'name')
      .exec()
    res.render('posts/Index', { posts, userId: req.author ? req.author._id : null })
  } catch (error) {
    res.status(500).send('Error loading posts')
  }
}

exports.show = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name')
      .exec()
    if (!post) {
      return res.status(404).send('Post not found')
    }
    res.render('posts/Show', { post, userId: req.author ? req.author._id : null })
  } catch (error) {
    res.status(500).send('Error loading post')
  }
}

exports.newView = (req, res) => {
  res.render('posts/New')
}

exports.edit = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).send('Post not found')
    }
    res.render('posts/Edit', { post })
  } catch (error) {
    res.status(500).send('Error loading edit form')
  }
}

exports.redirectHome = (req, res) => {
  res.redirect('/posts')
}

exports.redirectShow = (req, res) => {
  res.redirect(`/posts/${req.params.id}`)
}
