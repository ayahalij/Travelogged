const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
})

// Hide password from JSON responses
authorSchema.methods.toJSON = function() {
  const author = this.toObject()
  delete author.password
  return author
}

// Hash password before saving
authorSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

// Generate JWT token
authorSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, 'secret')
  return token
}

const Author = mongoose.model('Author', authorSchema)

module.exports = Author

