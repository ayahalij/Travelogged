const React = require('react');
const Layout = require('../layouts/Layout');

function Show({ post, userId }) {
  // Format the date for the input field
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  // Check if current user has liked the post
  const hasLiked = post.likes && post.likes.some(likeUserId => likeUserId.toString() === userId.toString());
  const likeCount = post.likes ? post.likes.length : 0;

  return (
    <Layout title={`${post.title}`} userId={userId}>
      <h2>{post.title}</h2>
      
      <div className="post-content">
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
          <label>Image:</label>
          <div className="form-input">
            {post?.imageUrl ? (
              <img src={post.imageUrl} alt="Travel" style={{ maxWidth: '100%', height: 'auto' }} />
            ) : (
              "No image"
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Background Sound:</label>
          <p className="form-input">
            {post?.backgroundSoundUrl ? 
              <a href={post.backgroundSoundUrl} target="_blank" rel="noreferrer">
                Listen to background sound
              </a> : 
              "No sound"
            }
          </p>
        </div>

        <div className="form-group">
          <label>Travel Story:</label>
          <p className="form-input">{post?.content || "No content available."}</p>
        </div>

        {/* Like section */}
        <div className="like-section">
          <div className="like-info">
          
          
          <form action={`/posts/${post._id}/toggle-like`} method="POST" className="like-form">
            <button type="submit" className={`like-btn ${hasLiked ? 'liked' : ''}`}>
              {hasLiked ? '❤️ Unlike' : '🤍 Like'}
            </button>
          </form> 
          
          <span className="like-count">{'  '+likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
        </div>
        </div>

        <div className="form-actions">
          <a href={`/posts/`} className="cancel-btn">Go Back to Posts</a>
          {/* Only show edit button if current user is the author */}
          {post.author && post.author.toString() === userId.toString() && (
            <a href={`/posts/${post._id}/edit`} className="edit-btn">Edit Post</a>
          )}
        </div>
      </div>

      <style jsx>{`
        .post-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        img {
          border-radius: 2px;
          margin-top: 10px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-input {
          margin-left: 25px;
          color: gray;
          line-height: 1.5;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
        }

        .like-info {
          margin-bottom: 10px;
        }

        .like-count {
          font-weight: bold;
          color: #6c757d;
        }

        .like-form {
          display: inline-block;
        }

        .like-btn {
          background-color: #ffffff;
          color: #6c757d;
          border: 2px solid #e9ecef;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .like-btn:hover {
          border-color: #dc3545;
          color: #dc3545;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .like-btn.liked {
          background-color: #dc3545;
          color: white;
          border-color: #dc3545;
        }

        .like-btn.liked:hover {
          background-color: #c82333;
          border-color: #c82333;
        }
        
        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 30px;
          flex-wrap: wrap;
        }
        
        .cancel-btn, .edit-btn {
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          display: inline-block;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }

        .cancel-btn {
          background-color: #6c757d;
        }

        .cancel-btn:hover {
          background-color: #545b62;
        }

        .edit-btn {
          background-color: #007bff;
        }

        .edit-btn:hover {
          background-color: #0056b3;
        }

        @media (max-width: 600px) {
          .form-actions {
            flex-direction: column;
          }
          
          .cancel-btn, .edit-btn {
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  );
}

module.exports = Show;