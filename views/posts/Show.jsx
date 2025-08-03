const React = require('react');
const Layout = require('../layouts/Layout');

function Show({ post, userId }) {
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
        <p className="form-input">{post?.title || "My Amazing Trip to..."}</p>
        </div>

        <div className="form-group">
        <label>Country:</label>
        <p className="form-input">{post?.country || "Unknown"}</p>
        </div>

        <div className="form-group">
        <label>City:</label>
        <p className="form-input">{post?.city || "Unknown"}</p>
        </div>

        <div className="form-group">
        <label>Travel Date:</label>
        <p className="form-input">{formatDate(post?.travelDate) || "Unknown"}</p>
        </div>

        <div className="form-group">
        <label>Duration:</label>
        <p className="form-input">{post?.duration || "Unknown"}</p>
        </div>

        <div className="form-group">
        <label>Image URL:</label>

        <div className="form-input">
        {post?.imageUrl ? (
            <img src={post.imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
        ) : (
            "No image"
        )}
        </div>

        </div>

        <div className="form-group">
        <label>Background Sound URL:</label>
        <p className="form-input">{post?.backgroundSoundUrl ? <a href={post.backgroundSoundUrl}>{post.backgroundSoundUrl}</a> : "No sound"}</p>
        </div>

        <div className="form-group">
        <label>Your Travel Story:</label>
        <p className="form-input">{post?.content || "No content available."}</p>
        </div>

        <div className="form-actions">
        <a href={`/posts/`} className="cancel-btn">Go Back to Post</a>
        </div>

      </form>

      <style jsx>{`
        img {
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin-top: 10px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-input{
            margin-left: 25px;
            color:gray;
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

module.exports = Show;