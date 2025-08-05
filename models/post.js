const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String, // URL or filename if uploaded
    required: false,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  travelDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: String, // e.g., "5 days", "2 weeks"
    required: true,
  },
  content: {
    type: String, // The blog/story content
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', // Changed from 'User' to 'Author'
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }], // Changed from 'User' to 'Author'
  comments: [
    {
      commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
      content: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);