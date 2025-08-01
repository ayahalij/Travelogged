
const Post = require('../../models/post')

const apiController = {
  index(req, res) {
    res.json(res.locals.data.posts)
  },

  show(req, res) {
    res.json(res.locals.data.post)
  },

  create(req, res) {
    res.status(201).json(res.locals.data.post)
  },

  destroy(req, res) {
    res.status(200).json({ message: 'Post successfully deleted' })
  }
}

module.exports = apiController