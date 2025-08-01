const Author = require('../../models/auth') // Change to User if you switched models
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
  try {
    let token;
    
    console.log('API Auth - Cookies:', req.cookies);
    console.log('API Auth - Headers:', req.header('Authorization'));
    
    // Check cookies first, then headers
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log('API Token found in cookies:', token);
    } else if (req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
      console.log('API Token found in headers:', token);
    } else {
      console.log('API No token found');
      throw new Error('No token provided');
    }

    const data = jwt.verify(token, 'secret');
    console.log('API JWT decoded:', data);

    const author = await Author.findById(data._id);
    if (!author) {
      console.log('API Author not found for ID:', data._id);
      throw new Error('Author not found');
    }

    console.log('API Auth successful for:', author.name);
    req.author = author;
    res.locals.data.token = token;
    next();
  } catch (error) {
    console.error('API Auth error:', error.message);
    res.status(401).json({ message: 'Not authorized', error: error.message });
  }
};

exports.createAuthor = async (req, res) => {
  try {
    console.log('API Creating author with data:', req.body);
    
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }
    
    const author = new Author(req.body)
    await author.save()
    const token = await author.generateAuthToken()
    
    console.log('API Author created successfully');
    res.status(201).json({ author, token })
  } catch (error) {
    console.error('API Create author error:', error.message);
    res.status(400).json({ message: error.message })
  }
}

exports.loginAuthor = async (req, res) => {
  try {
    console.log('API Login attempt for email:', req.body.email);
    
    const author = await Author.findOne({ email: req.body.email })
    if (!author) {
      console.log('API No author found with email:', req.body.email);
      return res.status(400).json({ message: 'Invalid login credentials' })
    }
    
    const isPasswordMatch = await bcrypt.compare(req.body.password, author.password);
    if (!isPasswordMatch) {
      console.log('API Password mismatch for:', req.body.email);
      return res.status(400).json({ message: 'Invalid login credentials' })
    }
    
    const token = await author.generateAuthToken()
    console.log('API Login successful');
    res.json({ author, token })
  } catch (error) {
    console.error('API Login error:', error.message);
    res.status(400).json({ message: error.message })
  }
}

exports.getProfile = async (req, res) => {
  try {
    await req.author.populate('posts')
    res.json({ author: req.author })
  } catch (error) {
    console.error('API Get profile error:', error.message);
    res.status(400).json({ message: error.message })
  }
}