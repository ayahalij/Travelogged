const Post = require('../../models/post')

const dataController = {}

dataController.index = async (req, res, next) => {
  try {
    const author = await req.author.populate('posts')
    res.locals.data.posts = author.posts
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

dataController.create = async (req, res, next) => {
  try {
    console.log('=== POST REQUEST DEBUG ===');
    console.log('Request method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request headers:', req.headers);
    console.log('Raw req.body:', req.body);
    console.log('Type of req.body:', typeof req.body);
    console.log('req.body is null?', req.body === null);
    console.log('req.body is undefined?', req.body === undefined);
    console.log('Object.keys(req.body):', req.body ? Object.keys(req.body) : 'N/A');
    console.log('=== END DEBUG ===');
    
    // Check if req.body exists and is an object
    if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
      throw new Error('No form data received');
    }
    
    // Create a safe copy and add author
    const postData = { ...req.body };
    postData.author = req.author._id;
    
    console.log('Final post data:', postData);
    
    res.locals.data.post = await Post.create(postData);
    req.author.posts.addToSet({ _id: res.locals.data.post._id });
    await req.author.save();
    
    console.log('Post created successfully:', res.locals.data.post._id);
    next();
  } catch (error) {
    console.error('Post creation error:', error.message);
    res.status(400).send({ message: error.message });
  }
}

dataController.show = async (req, res, next) => {
  try {
    res.locals.data.post = await Post.findById(req.params.id)
    if (!res.locals.data.post) {
      throw new Error(`Could not locate a post with the id ${req.params.id}`)
    }
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

dataController.update = async (req, res, next) => {
  try {
    console.log('Updating post with data:', req.body);
    
    // Remove the published field handling since it's not in your Post model
    res.locals.data.post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    
    console.log('Post updated successfully');
    next()
  } catch (error) {
    console.error('Post update error:', error.message);
    res.status(400).send({ message: error.message })
  }
}

dataController.destroy = async (req, res, next) => {
  try {
    await Post.findOneAndDelete({ _id: req.params.id })
    console.log('Post deleted successfully');
    next()
  } catch (error) {
    console.error('Post delete error:', error.message);
    res.status(400).send({ message: error.message })
  }
}

module.exports = dataController