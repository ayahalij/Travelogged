const Post = require('../../models/post')

exports.index = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('author', 'name')
      .populate('likes', 'name')
      .sort({ createdAt: -1 })
      .exec()

    res.render('posts/Index', { posts, userId: req.author?._id.toString() })
  } catch (error) {
    res.status(500).send('Error loading posts')
  }
}

exports.show = (req, res) => {
  const post = res.locals.data.post
  if (!post) return res.status(404).send('Post not found')
  res.render('posts/Show', { post, userId: req.author?._id.toString() })
}

exports.newView = (req, res) => {
  res.render('posts/New', { userId: req.author?._id.toString() })
}

exports.edit = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).send('Post not found')
    if (post.author.toString() !== req.author._id.toString()) return res.status(403).send('Not authorized')
    res.render('posts/Edit', { post, userId: req.author._id.toString() })
  } catch (error) {
    res.status(500).send('Error loading edit form')
  }
}

exports.redirectHome = (req, res) => res.redirect('/posts')
exports.redirectShow = (req, res) => res.redirect(`/posts/${req.params.id}`)
