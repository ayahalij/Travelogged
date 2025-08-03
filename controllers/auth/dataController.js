const Author = require('../../models/auth') // Change to User if you switched models
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
  try {
    let token;
    
    console.log('Checking auth - Cookies:', req.cookies);
    console.log('Checking auth - Query:', req.query.token);
    console.log('Checking auth - Headers:', req.header('Authorization'));
    
    // Check multiple places for the token (cookies first since that's what login sets)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log('Token found in cookies:', token);
    } else if (req.query.token) {
      token = req.query.token;
      console.log('Token found in query:', token);
    } else if (req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
      console.log('Token found in headers:', token);
    } else {
      console.log('No token found anywhere');
      throw new Error('No token provided');
    }

    const data = jwt.verify(token, 'secret');
    console.log('JWT decoded:', data);
    
    const author = await Author.findOne({ _id: data._id });
    if (!author) {
      console.log('Author not found for ID:', data._id);
      throw new Error('Author not found');
    }
    
    console.log('Auth successful for:', author.name);
    req.author = author;
    res.locals.data.token = token;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).send('Not authorized');
  }
};

exports.createAuthor = async (req, res, next) => {
  try {
    console.log('Creating author with data:', req.body);
    const author = new Author(req.body)
    await author.save()
    const token = await author.generateAuthToken()
    
    console.log('Author created, setting cookie with token:', token);
    
    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'lax',
    });
    
    res.locals.data.token = token
    req.author = author
    next()
  } catch (error) {
    console.error('Create author error:', error.message);
    res.status(400).json({ message: error.message })
  }
}

exports.loginAuthor = async (req, res, next) => {
  try {
    console.log('Login attempt for email:', req.body.email);
    
    const author = await Author.findOne({ email: req.body.email });
    if (!author) {
      console.log('No author found with email:', req.body.email);
      return res.status(400).send('Invalid login credentials');
    }
    
    const isPasswordMatch = await bcrypt.compare(req.body.password, author.password);
    if (!isPasswordMatch) {
      console.log('Password mismatch for:', req.body.email);
      return res.status(400).send('Invalid login credentials');
    }

    const token = await author.generateAuthToken();
    console.log('Login successful, setting cookie with token:', token);

    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'lax',
    });

    res.locals.data.token = token;
    req.author = author;
    console.log('Login complete for:', author.name);
    next();
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(400).json({ message: error.message });
  }
};

