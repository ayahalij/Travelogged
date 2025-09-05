const Post = require('../../models/post')

const dataController = {}

// Show all posts for current author
dataController.index = async (req, res, next) => {
  try {
    const author = await req.author.populate('posts')
    res.locals.data.posts = author.posts
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// Create a new blog post
dataController.create = async (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
      throw new Error('No form data received')
    }

    const postData = { ...req.body }
    postData.author = req.author._id

    // Use Cloudinary URL if file uploaded
    if (req.file && req.file.path) {
      postData.imageUrl = req.file.path
    }

    res.locals.data.post = await Post.create(postData)
    req.author.posts.addToSet({ _id: res.locals.data.post._id })
    await req.author.save()

    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// Show single post
dataController.show = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('likes', 'name')
      .populate('author', 'name')
      .exec()

    if (!post) throw new Error(`Post not found with id ${req.params.id}`)

    // Populate commenter names
    const Author = require('../../models/auth')
    if (post.comments && post.comments.length > 0) {
      for (let comment of post.comments) {
        if (comment.commenter) {
          const commenter = await Author.findById(comment.commenter).select('name')
          comment.commenter = commenter
        }
      }
      // Sort newest first
      post.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    res.locals.data.post = post
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// Update blog post
dataController.update = async (req, res, next) => {
  try {
    const existingPost = await Post.findById(req.params.id)
    if (!existingPost) throw new Error('Post not found')

    if (existingPost.author.toString() !== req.author._id.toString()) {
      throw new Error('Not authorized to edit this post')
    }

    const updateData = { ...req.body }
    if (req.file && req.file.path) {
      updateData.imageUrl = req.file.path
    } else if (req.body.currentImageUrl) {
      updateData.imageUrl = req.body.currentImageUrl
    }
    delete updateData.currentImageUrl

    res.locals.data.post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true })
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// Delete blog post
dataController.destroy = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("author")
    if (!post) return res.status(404).send({ message: "Post not found" })
    if (post.author._id.toString() !== req.author._id.toString()) {
      return res.status(403).send({ message: "Unauthorized" })
    }

    await post.deleteOne()
    next()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

// Toggle like
dataController.toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).send({ message: 'Post not found' })

    const userId = req.author._id.toString()
    const likedIndex = post.likes.findIndex(id => id.toString() === userId)

    if (likedIndex === -1) post.likes.push(userId)
    else post.likes.splice(likedIndex, 1)

    await post.save()
    res.locals.data.post = post
    next()
  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

// Create comment
dataController.createComment = async (req, res, next) => {
  try {
    const { content } = req.body
    if (!content || content.trim() === '') return res.status(400).send({ message: 'Comment required' })

    const newComment = { commenter: req.author._id, content: content.trim(), createdAt: new Date() }
    await Post.findByIdAndUpdate(req.params.id, { $push: { comments: newComment } })
    next()
  } catch (error) {
    res.status(500).send({ message: 'Error creating comment' })
  }
}

// Delete comment
dataController.deleteComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) return res.status(404).send({ message: 'Post not found' })

    const comment = post.comments.id(req.params.commentId)
    if (!comment) return res.status(404).send({ message: 'Comment not found' })

    const isAuthor = comment.commenter.toString() === req.author._id.toString() || post.author.toString() === req.author._id.toString()
    if (!isAuthor) return res.status(403).send({ message: 'Not authorized' })

    await Post.findByIdAndUpdate(req.params.postId, { $pull: { comments: { _id: req.params.commentId } } })
    next()
  } catch (error) {
    res.status(500).send({ message: 'Error deleting comment' })
  }
}

module.exports = dataController
