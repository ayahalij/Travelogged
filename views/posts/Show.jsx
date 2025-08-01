const React = require('react');
const Layout = require('../layouts/Layout');

function Edit({ post, userId }) {
  // Format the date for the input field
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  return (
    <Layout title={`Edit ${post.title}`} userId={userId}>
      <h2>Edit Your Travel Experience</h2>
      
      <form action={`/posts/${post._id}?_method=PUT`} method="POST">
        <div className="form-group">
        <label>Travel Title:</label>
        <p>{post?.title || "My Amazing Trip to..."}</p>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input 
            type="text" 
            id="country" 
            name="country" 
            required 
            defaultValue={post.country}
            placeholder="Japan"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input 
            type="text" 
            id="city" 
            name="city" 
            required 
            defaultValue={post.city}
            placeholder="Tokyo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="travelDate">Travel Date:</label>
          <input 
            type="date" 
            id="travelDate" 
            name="travelDate" 
            required 
            defaultValue={formatDate(post.travelDate)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <input 
            type="text" 
            id="duration" 
            name="duration" 
            required 
            defaultValue={post.duration}
            placeholder="5 days"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input 
            type="url" 
            id="imageUrl" 
            name="imageUrl" 
            defaultValue={post.imageUrl || ''}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="backgroundSoundUrl">Background Sound URL:</label>
          <input 
            type="url" 
            id="backgroundSoundUrl" 
            name="backgroundSoundUrl" 
            defaultValue={post.backgroundSoundUrl || ''}
            placeholder="https://example.com/sound.mp3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Your Travel Story:</label>
          <textarea 
            id="content" 
            name="content" 
            rows="10" 
            required 
            defaultValue={post.content}
            placeholder="Tell us about your amazing travel experience..."
          ></textarea>
        </div>

        <div className="form-actions">
            <a href={`/posts/`} className="cancel-btn">Go Back to Post</a>
        </div>
      </form>

      <style jsx>{`
        .form-group {
          margin-bottom: 20px;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        input, textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        textarea {
          resize: vertical;
        }
        
        .form-actions {
          display: flex;
          gap: 10px;
        }
        
        button {
          background-color: #28a745;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        
        button:hover {
          background-color: #218838;
        }
        
        .cancel-btn {
          background-color: #6c757d;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          display: inline-block;
        }
        
        .cancel-btn:hover {
          background-color: #545b62;
        }
      `}</style>
    </Layout>
  );
}

module.exports = Edit;