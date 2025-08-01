const React = require('react');
const Layout = require('../layouts/Layout');

function Edit(props) {
  const { post } = props;
  return (
    <Layout title="Edit Post">
      <h2>Edit Travel Blog Post</h2>
      <form method="POST" action={`/posts/${post._id}?_method=PUT`} encType="multipart/form-data">
        <label>Title:</label>
        <input name="title" type="text" defaultValue={post.title} required />
        
        <label>Image URL:</label>
        <input name="imageUrl" type="text" defaultValue={post.imageUrl} />
        
        <label>Country:</label>
        <input name="country" type="text" defaultValue={post.country} required />
        
        <label>City:</label>
        <input name="city" type="text" defaultValue={post.city} required />
        
        <label>Travel Date:</label>
        <input name="travelDate" type="date" defaultValue={post.travelDate.toISOString().split('T')[0]} required />
        
        <label>Duration:</label>
        <input name="duration" type="text" defaultValue={post.duration} required />
        
        <label>Background Sound URL:</label>
        <input name="backgroundSoundUrl" type="text" defaultValue={post.backgroundSoundUrl} />
        
        <label>Story:</label>
        <textarea name="content" required>{post.content}</textarea>
        
        <button type="submit">Update Post</button>
      </form>
    </Layout>
  );
}

module.exports = Edit;
