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
    <html>
      <head>
        <title>{post.title}</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div className="page-container">
          <div className="main-container">
            {/* Header */}
            <div className="header-section">
              <div className="card-header">
                <h1>{post.title}</h1>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="content-layout">
              {/* Left Side - Post Details */}
              <div className="post-details-card">
                <div className="detail-item">
                  <label>Username</label>
                  <div className="detail-value">{post?.author?.name || "Unknown Author"}</div>
                </div>

                <div className="detail-item">
                  <label>Country</label>
                  <div className="detail-value">{post?.country || "Unknown"}</div>
                </div>

                <div className="detail-item">
                  <label>City</label>
                  <div className="detail-value">{post?.city || "Unknown"}</div>
                </div>

                <div className="detail-item">
                  <label>Date</label>
                  <div className="detail-value">{formatDate(post?.travelDate) || "Unknown"}</div>
                </div>

                <div className="detail-item">
                  <label>Duration</label>
                  <div className="detail-value">{post?.duration || "Unknown"}</div>
                </div>

                <div className="detail-item blog-section">
                  <label>Blog</label>
                  <div className="blog-content">{post?.content || "No content available."}</div>
                </div>
              </div>

              {/* Right Side - Image and Like */}
              <div className="image-section">
                <div className="image-card">
                  {post?.imageUrl ? (
                    <img src={post.imageUrl} alt="Travel" className="post-image" />
                  ) : (
                    <div className="no-image-placeholder">
                      <p>No Image</p>
                    </div>
                  )}
                </div>
                
                {/* Like Button */}
                <div className="like-section">
                  <form action={`/posts/${post._id}/toggle-like`} method="POST" className="like-form">
                    <button type="submit" className={`like-btn ${hasLiked ? 'liked' : ''}`}>
                      {hasLiked ? '❤️' : '🤍'}
                    </button>
                  </form>
                  <div className="like-count">{likeCount}</div>
                </div>
              </div>
            </div>

            {/* Background Sound Section */}
            {post?.backgroundSoundUrl && (
              <div className="sound-section">
                <label>Background Sound:</label>
                <a href={post.backgroundSoundUrl} target="_blank" rel="noreferrer" className="sound-link">
                  🎵 Listen to background sound
                </a>
              </div>
            )}

            {/* Like Details */}
            {likedUsernames.length > 0 && (
              <div className="liked-by-section">
                <p className="liked-by-text">
                  <strong>Liked by:</strong> {likedUsernames.join(', ')}
                </p>
              </div>
            )}

            {/* Comments Section */}
            <div className="comments-section">
              <div className="comments-header">
                <h3>Comments ({comments.length})</h3>
              </div>
              
              {/* Add Comment Form */}
              <div className="add-comment-card">
                <form action={`/posts/${post._id}/comments`} method="POST" className="comment-form">
                  <div className="comment-input-group">
                    <input 
                      type="text"
                      name="content" 
                      placeholder="Write comment" 
                      required 
                      maxLength="500"
                      className="comment-input"
                    />
                    <button type="submit" className="comment-submit-btn">Send the comment</button>
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

            {/* Action buttons */}
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
            </div>
          </div>
        </div>

        <style jsx>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f5f7fa;
            min-height: 100vh;
            padding: 20px;
          }

          .page-container {
            display: flex;
            justify-content: center;
            min-height: calc(100vh - 40px);
          }

          .main-container {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            width: 100%;
            max-width: 1200px;
            border: 3px solid #2c5aa0;
          }

          .header-section {
            margin-bottom: 0;
          }

          .card-header {
            background: #c83434;
            color: white;
            padding: 20px 30px;
            text-align: center;
          }

          .card-header h1 {
            font-size: 1.8em;
            font-weight: 600;
            margin: 0;
          }

          .content-layout {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 30px;
            padding: 30px;
          }

          .post-details-card {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 25px;
            border: 2px solid #e9ecef;
          }

          .detail-item {
            margin-bottom: 20px;
          }

          .detail-item label {
            display: block;
            font-weight: 600;
            color: #2c3e50;
            font-size: 16px;
            margin-bottom: 8px;
          }

          .detail-value {
            background: white;
            padding: 12px 16px;
            border-radius: 8px;
            color: #6c757d;
            border: 1px solid #e9ecef;
            min-height: 45px;
            display: flex;
            align-items: center;
          }

          .blog-section {
            margin-top: 30px;
          }

          .blog-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            color: #495057;
            border: 1px solid #e9ecef;
            min-height: 120px;
            line-height: 1.6;
            white-space: pre-wrap;
          }

          .image-section {
            display: flex;
            flex-direction: column;
            padding-top:100px;
            gap: 20px;
          }

          .image-card {
            background: #2c5aa0;
            height:450px;
            padding-top:20px;
            padding-left:20px;
            overflow: hidden;
            aspect-ratio: 4/3;
            position: relative;
          }

          .post-image {
            width: 95%;
            height: 90%;
            object-fit: cover;
            border: 0.03px solid #e9ecef4f;
            box-shadow: rgba(232, 234, 235, 0.76) 0px 8px 24px;
          }

          .no-image-placeholder {            
            padding-top:20px;
            padding-left:20px;
            width: 95%;
            height: 90%;            
            border: 0.03px solid #e9ecef4f;
            box-shadow: rgba(232, 234, 235, 0.76) 0px 8px 24px;            
            background: #b0c9f3ff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2em;
          }

          .like-section {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          .like-form {
            display: flex;
          }

          .like-btn {
            background: none;
            border: none;
            font-size: 2em;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .like-btn:hover {
            transform: scale(1.1);
            background: rgba(220, 53, 69, 0.1);
          }

          .like-btn.liked {
            animation: heartbeat 0.6s ease-in-out;
          }

          @keyframes heartbeat {
            0% { transform: scale(1); }
            25% { transform: scale(1.2); }
            50% { transform: scale(1); }
            75% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }

          .like-count {
            font-size: 1.2em;
            font-weight: 600;
            color: #dc3545;
          }

          .sound-section {
            padding: 20px 30px;
            background: #f8f9fa;
            margin: 20px 30px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
          }

          .sound-section label {
            font-weight: 600;
            color: #2c3e50;
            margin-right: 10px;
          }

          .sound-link {
            color: #007bff;
            text-decoration: none;
            font-weight: 500;
          }

          .sound-link:hover {
            text-decoration: underline;
          }

          .liked-by-section {
            padding: 15px 30px;
            background: #e3f2fd;
            margin: 0 30px 20px 30px;
            border-radius: 8px;
            border-left: 4px solid #2196f3;
          }

          .liked-by-text {
            margin: 0;
            color: #1565c0;
          }

          .comments-section {
            margin: 30px;
            background: white;
            border-radius: 12px;
            border: 3px solid #c83434;
            overflow: hidden;
          }

          .comments-header {
            background: #c83434;
            color: white;
            padding: 20px 25px;
            text-align: center;
          }

          .comments-header h3 {
            margin: 0;
            font-size: 1.4em;
            font-weight: 600;
          }

          .add-comment-card {
            padding: 25px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
          }

          .comment-form {
            width: 100%;
          }

          .comment-input-group {
            display: flex;
            gap: 15px;
            align-items: center;
          }

          .comment-input {
            flex: 1;
            padding: 12px 16px;
            border: 2px solid #e9ecef;
            border-radius: 25px;
            font-size: 14px;
            background-color: white;
            transition: all 0.3s ease;
            font-family: inherit;
          }

          .comment-input:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
          }

          .comment-submit-btn {
            background: #2c5aa0;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
            white-space: nowrap;
          }

          .comment-submit-btn:hover {
            background: #1e3d6f;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(44, 90, 160, 0.3);
          }

          .comments-list {
            padding: 25px;
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
            justify-content: center;
            gap: 15px;
            margin: 30px;
            padding: 20px;
            border-top: 1px solid #e9ecef;
            flex-wrap: wrap;
          }

          .cancel-btn, .edit-btn {
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 25px;
            display: inline-flex;
            align-items: center;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .cancel-btn {
            background: #6c757d;
          }

          .cancel-btn:hover {
            background: #545b62;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
          }

          .edit-btn {
            background: #2c5aa0;
          }

          .edit-btn:hover {
            background: #1e3d6f;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(44, 90, 160, 0.3);
          }

          .delete-form {
            display: inline-block;
            margin: 0;
          }

          .delete-btn {
            background: #dc3545;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
          }

          .delete-btn:hover {
            background: #c82333;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
          }

          /* Mobile Responsive */
          @media (max-width: 968px) {
            .content-layout {
              grid-template-columns: 1fr;
              gap: 20px;
              padding: 20px;
            }

            .image-section {
              order: -1;
            }

            .card-header h1 {
              font-size: 2em;
            }
          }

          @media (max-width: 768px) {
            .page-container {
              padding: 10px;
            }

            .main-container {
              border-radius: 12px;
            }

            .content-layout {
              padding: 15px;
            }

            .comment-input-group {
              flex-direction: column;
              align-items: stretch;
            }

            .comment-submit-btn {
              align-self: stretch;
            }

            .form-actions {
              flex-direction: column;
              align-items: center;
            }

            .cancel-btn, .edit-btn, .delete-btn {
              text-align: center;
              width: 100%;
              max-width: 200px;
              justify-content: center;
            }
          }

          @media (max-width: 480px) {
            .card-header {
              padding: 15px 20px;
            }

            .card-header h1 {
              font-size: 1.8em;
            }

            .content-layout {
              padding: 10px;
            }

            .post-details-card {
              padding: 15px;
            }

            .comments-section {
              margin: 20px 10px;
            }

            .form-actions {
              margin: 20px 10px;
            }
          }
        `}</style>
      </body>
    </html>
  );
}

module.exports = Show;