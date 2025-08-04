const React = require('react');
const Layout = require('../layouts/Layout');

function Show({ post, userId }) {
  // Format the date for the input field
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  // Format comment date
  const formatCommentDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Check if current user has liked the post
  const hasLiked = post.likes && post.likes.some(like => {
    const likeId = typeof like === 'object' ? like._id.toString() : like.toString();
    return likeId === userId.toString();
  });
  
  const likeCount = post.likes ? post.likes.length : 0;
  
  // Get usernames of people who liked (if populated)
  const likedUsernames = post.likes && post.likes.length > 0 
    ? post.likes.map(like => {
        if (typeof like === 'object' && like.name) { // Changed from like.username to like.name
          return like.name;
        }
        return null;
      }).filter(Boolean)
    : [];

  const comments = post.comments || [];

  // Check if current user is the post author
  // Debug logging to see the values
  console.log('Post author:', post.author);
  console.log('Post author type:', typeof post.author);
  console.log('User ID:', userId);
  console.log('User ID type:', typeof userId);
  
  // Handle different possible structures for post.author
  let authorId = null;
  if (post.author) {
    if (typeof post.author === 'object' && post.author._id) {
      authorId = post.author._id.toString();
    } else {
      authorId = post.author.toString();
    }
  }
  
  const isPostAuthor = authorId && userId && authorId === userId.toString();
  
  console.log('Author ID:', authorId);
  console.log('Is post author:', isPostAuthor);

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

        <div className="form-group">
          <label>Author:</label>
          <p className="form-input">{post?.author?.name || "Unknown Author"}</p>
        </div>

        {/* Like section */}
        <div className="like-section">
          <div className="like-info">
            <span className="like-count">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
            
            {likedUsernames.length > 0 && (
              <div className="liked-by">
                <p className="liked-by-text">
                  <strong>Liked by:</strong> {likedUsernames.join(', ')}
                </p>
              </div>
            )}
          </div>
          
          <form action={`/posts/${post._id}/toggle-like`} method="POST" className="like-form">
            <button type="submit" className={`like-btn ${hasLiked ? 'liked' : ''}`}>
              {hasLiked ? '❤️ Unlike' : '🤍 Like'}
            </button>
          </form>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h3>Comments ({comments.length})</h3>
          
          {/* Add Comment Form */}
          <div className="add-comment">
            <form action={`/posts/${post._id}/comments`} method="POST" className="comment-form">
              <div className="comment-input-group">
                <textarea 
                  name="content" 
                  placeholder="Share your thoughts about this travel story..." 
                  required 
                  maxLength="500"
                  rows="3"
                  className="comment-textarea"
                ></textarea>
                <button type="submit" className="comment-submit-btn">Post Comment</button>
              </div>
            </form>
          </div>

          {/* Display Comments */}
          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              comments.map(comment => (
                <div key={comment._id} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{comment.commenter?.name || 'Anonymous'}</span>
                    <span className="comment-date">{formatCommentDate(comment.createdAt)}</span>
                  </div>
                  <div className="comment-content">
                    {comment.content}
                  </div>
                  {/* Delete button for comment author or post author */}
                  {(comment.commenter?._id?.toString() === userId.toString() || 
                    post.author?.toString() === userId.toString()) && (
                    <form 
                      action={`/posts/${post._id}/comments/${comment._id}?_method=DELETE`} 
                      method="POST" 
                      className="delete-comment-form"
                      onSubmit="return confirm('Are you sure you want to delete this comment?')"
                    >
                      <button type="submit" className="delete-comment-btn">Delete</button>
                    </form>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action buttons - Edit and Delete only show for post author */}
        <div className="form-actions">
          <a href={`/posts/`} className="cancel-btn">Go Back to Posts</a>
        
          
          {/* Only show Edit and Delete buttons if current user is the post author */}
          {isPostAuthor && (
            <>
              <a href={`/posts/${post._id}/edit`} className="edit-btn">Edit Post</a>
              <form 
                action={`/posts/${post._id}?_method=DELETE`} 
                method="POST" 
                className="delete-form"
                onSubmit="return confirm('Are you sure you want to delete this post? This action cannot be undone.')"
              >
                <button type="submit" className="delete-btn">Delete Post</button>
              </form>
            </>
          )}
          
          {/* Fallback buttons for testing - remove after debugging */}
          {!isPostAuthor && (
            <div style={{ fontSize: '12px', color: '#999' }}>
              Edit and Delete buttons are hidden because you're not the post author.
            </div>
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
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
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

        .like-section {
          margin: 30px 0;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .like-info {
          margin-bottom: 10px;
        }

        .like-count {
          font-weight: bold;
          color: #6c757d;
          margin-bottom: 10px;
          display: block;
        }

        .liked-by {
          margin-top: 10px;
          padding: 10px;
          background-color: #ffffff;
          border-radius: 6px;
          border: 1px solid #e9ecef;
        }

        .liked-by-text {
          margin: 0;
          font-size: 14px;
          color: #495057;
        }

        .liked-by-text strong {
          color: #343a40;
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

        /* Comments Section Styles */
        .comments-section {
          margin: 40px 0;
          padding: 25px;
          background-color: #ffffff;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .comments-section h3 {
          margin: 0 0 20px 0;
          color: #343a40;
          font-size: 1.4em;
          font-weight: 600;
        }

        .add-comment {
          margin-bottom: 30px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .comment-form {
          width: 100%;
        }

        .comment-input-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .comment-textarea {
          width: 100%;
          min-height: 80px;
          padding: 12px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.5;
          resize: vertical;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }

        .comment-textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }

        .comment-submit-btn {
          align-self: flex-end;
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }

        .comment-submit-btn:hover {
          background-color: #0056b3;
        }

        .comments-list {
          space-y: 20px;
        }

        .no-comments {
          text-align: center;
          color: #6c757d;
          font-style: italic;
          padding: 30px 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          margin: 0;
        }

        .comment {
          margin-bottom: 20px;
          padding: 15px;
          background-color: #ffffff;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          position: relative;
          transition: box-shadow 0.3s ease;
        }

        .comment:hover {
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #f1f3f4;
        }

        .comment-author {
          font-weight: 600;
          color: #007bff;
          font-size: 14px;
        }

        .comment-date {
          font-size: 12px;
          color: #6c757d;
        }

        .comment-content {
          margin-bottom: 10px;
          line-height: 1.5;
          color: #343a40;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .delete-comment-form {
          display: inline-block;
        }

        .delete-comment-btn {
          background: none;
          border: none;
          color: #dc3545;
          cursor: pointer;
          font-size: 12px;
          text-decoration: underline;
          padding: 0;
          transition: color 0.3s ease;
        }

        .delete-comment-btn:hover {
          color: #c82333;
        }
        
        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 30px;
          flex-wrap: wrap;
          align-items: center;
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

        .delete-form {
          display: inline-block;
          margin: 0;
        }

        .delete-btn {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }

        .delete-btn:hover {
          background-color: #c82333;
        }

        @media (max-width: 600px) {
          .form-actions {
            flex-direction: column;
          }
          
          .cancel-btn, .edit-btn, .delete-btn {
            text-align: center;
            width: 100%;
          }

          .comment-input-group {
            gap: 15px;
          }

          .comment-submit-btn {
            align-self: stretch;
          }

          .comment-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }
        }
      `}</style>
    </Layout>
  );
}

module.exports = Show;