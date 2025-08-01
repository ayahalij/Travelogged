// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   bio: {
//     type: String,
//     default: ''
//   },
//   posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
// });

// // Hide password from JSON responses
// userSchema.methods.toJSON = function() {
//   const user = this.toObject();
//   delete user.password;
//   return user;
// };

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// // Generate JWT token
// userSchema.methods.generateAuthToken = async function() {
//   const token = jwt.sign({ _id: this._id }, 'secret');
//   return token;
// };

// module.exports = mongoose.model('User', userSchema);