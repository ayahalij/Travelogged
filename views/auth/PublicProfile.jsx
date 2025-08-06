const React = require('react');

function PublicProfile({ user, userPosts, likedPosts, userComments, currentUser, isOwnProfile }) {

  return (
    <html>
      <head>
        <title>{user.name}'s Profile</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div className="page-container">
          <div className="main-card">
            {/* Navigation Bar */}
            <nav className="navbar">
              <div className="nav-container">
                <div className="nav-brand">
                    Travelogged
                </div>
                
                <div className="nav-links">
                  <a href="/posts" className="nav-link">
                    <span className="nav-icon">🏠︎</span>Home
                  </a>
                  {currentUser && (
                    <>
                      <a href="/posts/new" className="nav-link">
                        <span className="nav-icon">✦</span>
                        Create Post
                      </a>
                      <a href="/profile" className="nav-link">
                        <span className="nav-icon">☰</span>
                        My Profile
                      </a>
                    </>
                  )}
                  {currentUser ? (
                    <a href="/" className="nav-link logout">
                      <span className="nav-icon">⍈</span>
                      Log Out
                    </a>
                  ) : (
                    <a href="/authors/signin" className="nav-link">
                      <span className="nav-icon">↳</span>
                      Sign In
                    </a>
                  )}
                </div>
              </div>
            </nav>

            {/* Card top */}
            <div className="card-header">
              <h1>{user.name}'s Profile</h1>
              {isOwnProfile && (
                <p className="profile-note">This is your profile - others see this view</p>
              )}
            </div>

            <div className="card-content">
              {/* Profile Info Section */}
              <div className="profile-info-section">
                <div className="profile-card">
                  <div className="profile-avatar">
                    <div className="avatar-circle">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="profile-details">
                    <p className="profile-name"> 
                      <span className="highlighted">Name: </span> {user.name}
                    </p>
                    
                    {/* Only show email if it's the user's own profile */}
                    {isOwnProfile && (
                      <p className="profile-email"> 
                        <span className="highlighted">Email: </span> {user.email}
                      </p>
                    )}

                    {user.bio && (
                      <p className="profile-bio"> 
                        <span className="highlighted">Bio: </span> {user.bio}
                      </p>
                    )}
                    
                    <div className="profile-stats">
                      <div className="stat-item">
                        <span className="stat-number">{userPosts.length}</span>
                        <span className="stat-label">Posts</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">{likedPosts.length}</span>
                        <span className="stat-label">Liked</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">{userComments.length}</span>
                        <span className="stat-label">Comments</span>
                      </div>
                    </div>
                    
                    {/* Only show edit button if it's their own profile */}
                    {isOwnProfile && (
                      <div className="profile-actions">
                        <a href="/profile/edit" className="edit-profile-btn">
                          Edit Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="tabs-section">
                <div className="tabs-nav">
                  <button 
                    className="tab-btn active" 
                    data-tab="user-posts"
                  >
                    Posts ({userPosts.length})
                  </button>
                  <button 
                    className="tab-btn" 
                    data-tab="liked-posts"
                  >
                    Liked Posts ({likedPosts.length})
                  </button>
                  <button 
                    className="tab-btn" 
                    data-tab="user-comments"
                  >
                    Comments ({userComments.length})
                  </button>
                </div>

                {/* User Posts Tab */}
                <div className="tab-content active" id="user-posts">
                  <div className="posts-header">
                    <h3>{isOwnProfile ? 'My Travel Stories' : `${user.name}'s Travel Stories`}</h3>
                    {isOwnProfile && (
                      <a href="/posts/new" className="create-post-btn">
                        Create New Post
                      </a>
                    )}
                  </div>
                  
                  {userPosts.length === 0 ? (
                    <div className="no-posts">
                      <div className="no-posts-icon">✈︎</div>
                      <h4>{isOwnProfile ? 'No posts yet' : `${user.name} hasn't shared any posts yet`}</h4>
                    </div>
                  ) : (
                    <div className="posts-grid">
                      {userPosts.map(post => {
                        const likeCount = post.likes ? post.likes.length : 0;
                        return (
                          <div key={post._id} className="post-card">
                            <div className="post-image-container">
                              <a href={`/posts/${post._id}`} className="image-link">
                                {post.imageUrl ? (
                                  <img 
                                    src={post.imageUrl} 
                                    alt={post.title}
                                    className="post-image"
                                  />
                                ) : (
                                  <div className="no-image-placeholder">
                                    <p>No Image</p>
                                  </div>
                                )}
                              </a>
                              
                              <div className="post-overlay">
                                <h4 className="post-title">{post.title}</h4>
                                <p className="post-location">{post.city}, {post.country}</p>
                                <div className="post-stats">
                                  <span className="like-count">♡ {likeCount}</span>
                                </div>
                              </div>
                              
                              {/* Only show edit button if it's their own profile */}
                              {isOwnProfile && (
                                <div className="post-actions">
                                  <a href={`/posts/${post._id}/edit`} className="action-btn edit">
                                    ✎
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Liked Posts Tab */}
                <div className="tab-content" id="liked-posts">
                  <div className="posts-header">
                    <h3>{isOwnProfile ? 'Posts I Liked' : `Posts ${user.name} Liked`}</h3>
                  </div>
                  
                  {likedPosts.length === 0 ? (
                    <div className="no-posts">
                      <div className="no-posts-icon">❤︎</div>
                      <h4>{isOwnProfile ? 'No liked posts yet' : `${user.name} hasn't liked any posts yet`}</h4>
                    </div>
                  ) : (
                    <div className="posts-grid">
                      {likedPosts.map(post => {
                        const likeCount = post.likes ? post.likes.length : 0;
                        return (
                          <div key={post._id} className="post-card">
                            <div className="post-image-container">
                              <a href={`/posts/${post._id}`} className="image-link">
                                {post.imageUrl ? (
                                  <img 
                                    src={post.imageUrl} 
                                    alt={post.title}
                                    className="post-image"
                                  />
                                ) : (
                                  <div className="no-image-placeholder">
                                    <p>No Image</p>
                                  </div>
                                )}
                              </a>
                              
                              <div className="post-overlay">
                                <h4 className="post-title">{post.title}</h4>
                                <p className="post-author">by <a href={`/user/${post.author._id}`} className="author-link">{post.author?.name || 'Unknown'}</a></p>
                                <p className="post-location">{post.city}, {post.country}</p>
                                <div className="post-stats">
                                  <span className="like-count">♡ {likeCount}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* User Comments Tab */}
                <div className="tab-content" id="user-comments">
                  <div className="posts-header">
                    <h3>{isOwnProfile ? 'My Comments' : `${user.name}'s Comments`}</h3>
                  </div>
                  
                  {userComments.length === 0 ? (
                    <div className="no-posts">
                      <div className="no-posts-icon">🗨</div>
                      <h4>{isOwnProfile ? 'No comments yet' : `${user.name} hasn't commented yet`}</h4>
                    </div>
                  ) : (
                    <div className="comments-list">
                      {userComments.map(comment => (
                        <div key={`${comment.post._id}-${comment._id}`} className="comment-card">
                          <div className="comment-header">
                            <div className="comment-post-info">
                              <h4 className="comment-post-title">
                                <a href={`/posts/${comment.post._id}`}>
                                  {comment.post.title}
                                </a>
                              </h4>
                              <p className="comment-post-author">
                                by <a href={`/user/${comment.post.author._id}`} className="author-link">{comment.post.author?.name || 'Unknown'}</a>
                              </p>
                            </div>

                          </div>
                          <div className="comment-content">
                            {comment.content}
                          </div>
                          <div className="comment-actions">
                            <a href={`/posts/${comment.post._id}`} className="view-post-btn">
                              View Post
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
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

          .main-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            width: 100%;
            max-width: 1200px;
            border: 3px solid #2c5aa0;
          }

          /* Navigation Bar Styles */
          .navbar {
            background: linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%);
            color: white;
            position: relative;
            z-index: 1000;
          }

          .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 30px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .nav-brand {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            color: white;
            text-decoration: none;
            font-size: 40px;
            font-weight: 700;
            transition: all 0.3s ease;
          }

          .nav-links {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .nav-link {
            display: flex;
            align-items: center;
            gap: 6px;
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            padding: 10px 16px;
            border-radius: 20px;
            font-weight: 500;
            font-size: 17px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .nav-link:hover {
            background: rgba(255, 255, 255, 0.15);
            color: white;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }

          .nav-link.active {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }

          .nav-link.logout {
            background: rgba(200, 52, 52, 0.8);
            margin-left: 8px;
          }

          .nav-link.logout:hover {
            background: rgba(200, 52, 52, 1);
          }

          .nav-icon {
            font-size: 16px;
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

          .profile-note {
            margin: 10px 0 0 0;
            font-size: 0.9em;
            opacity: 0.9;
            font-style: italic;
          }

          .card-content {
            padding: 30px;
          }

          /* Profile Info Section */
          .profile-info-section {
            margin-bottom: 40px;
          }

          .profile-card {
            display: flex;
            gap: 30px;
            background: white;
            border-radius: 16px;
            border: 3px solid #c83434;
            padding: 30px;
            color: black;
            align-items: center;
          }

          .profile-avatar {
            flex-shrink: 0;
          }

          .avatar-circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5em;
            font-weight: bold;
            backdrop-filter: blur(10px);
            border: 3px solid #2c5aa0;
          }

          .profile-details {
            flex: 1;
          }

          .highlighted {
             color:#2c5aa0;
              font-weight: 600;
          }

          .profile-name, .profile-email, .profile-bio {
            font-size: 1.3em;
            margin: 0 0 15px 0;
            opacity: 0.9;
            color: #4b5660ff;
          }

          .profile-name {
            padding-top: 10px;
            margin-bottom: 20px;
          }

          .profile-bio {
            margin-bottom: 20px;
            line-height: 1.5;
            max-width: 750px;
          }

          .profile-stats {
            display: flex;
            gap: 20px;
            margin-bottom: 25px;
            justify-content: center;
          }

          .stat-item {
            text-align: center;
          }

          .stat-number {
            display: block;
            font-size: 1.8em;
            font-weight: bold;
            color:#2c5aa0;
            font-weight: 600;
          }

          .stat-label {
            font-size: 0.9em;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .profile-actions {
            margin-top: 20px;
          }

          .edit-profile-btn {
            background: rgba(255, 255, 255, 0.2);
            color: black;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 2px solid #2c5aa0;
            display: inline-block;
          }

          .edit-profile-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
          }

          /* Tabs Section */
          .tabs-section {
            margin-bottom: 30px;
          }

          .tabs-nav {
            display: flex;
            gap: 5px;
            margin-bottom: 30px;
            background: #f8f9fa;
            padding: 5px;
            border-radius: 10px;
          }

          .tab-btn {
            flex: 1;
            background: none;
            border: none;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #6c757d;
          }

          .tab-btn.active {
            background: white;
            color: #2c5aa0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .tab-btn:hover:not(.active) {
            background: rgba(44, 90, 160, 0.1);
            color: #2c5aa0;
          }

          .tab-content {
            display: none;
          }

          .tab-content.active {
            display: block;
          }

          .posts-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            flex-wrap: wrap;
            gap: 15px;
          }

          .posts-header h3 {
            color: #2c3e50;
            font-size: 1.4em;
            margin: 0;
          }

          .create-post-btn, .create-first-post-btn{
            background: #2c5aa0;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
            display: inline-block;
          }

          .create-post-btn:hover, .create-first-post-btn:hover {
            background: #1e3d6f;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(44, 90, 160, 0.3);
          }

          /* No Posts State */
          .no-posts {
            text-align: center;
            padding: 80px 20px;
            color: #6c757d;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 16px;
            border: 2px dashed #dee2e6;
          }

          .no-posts-icon {
            font-size: 4em;
            margin-bottom: 20px;
          }

          .no-posts h4 {
            font-size: 1.5em;
            margin: 0 0 15px 0;
            color: #495057;
          }

          .no-posts p {
            font-size: 1.1em;
            margin: 0 0 30px 0;
          }

          /* Posts Grid */
          .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
          }

          .post-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 2px solid #e9ecef;
            position: relative;
          }

          .post-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            border-color: #c83434;
          }

          .post-image-container {
            position: relative;
            height: 220px;
            overflow: hidden;
          }

          .image-link {
            display: block;
            width: 100%;
            height: 100%;
            text-decoration: none;
            color: inherit;
          }

          .post-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .post-card:hover .post-image {
            transform: scale(1.05);
          }

          .no-image-placeholder {
            width: 100%;
            height: 100%;
            background: #b0c9f3ff;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 500;
          }

          .post-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(200,52,52, 0.9), rgba(200,52,52, 0.7), transparent);
            color: white;
            padding: 20px;
            transform: translateY(100%);
            transition: transform 0.3s ease;
          }

          .post-image-container:hover .post-overlay {
            transform: translateY(0);
          }

          .post-title {
            font-size: 1.1em;
            font-weight: 600;
            margin: 0 0 8px 0;
            line-height: 1.3;
          }

          .post-author, .post-location{
            font-size: 0.9em;
            margin: 0 0 5px 0;
            opacity: 0.9;
          }

          .post-stats {
            margin-top: 10px;
          }

          .like-count {
            font-size: 0.9em;
            opacity: 0.9;
          }

          .post-actions {
            position: absolute;
            top: 10px;
            right: 10px;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .post-card:hover .post-actions {
            opacity: 1;
          }

          .action-btn {
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            margin-bottom: 5px;
          }

          .action-btn:hover {
            background: white;
            transform: scale(1.1);
          }

          .action-btn.edit {
            color: #2c5aa0;
          }

          .author-link {
            color: #007bff;
            text-decoration: none;
            font-weight: 600;
          }

          .author-link:hover {
            color: #0056b3;
            text-decoration: underline;
          }

          /* Comments List Styles */
          .comments-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .comment-card {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 12px;
            padding: 20px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .comment-card:hover {
            border-color: #c83434;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }

          .comment-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
            padding-bottom: 12px;
            border-bottom: 1px solid #f1f3f4;
          }

          .comment-post-info {
            flex: 1;
          }

          .comment-post-title {
            margin: 0 0 5px 0;
            font-size: 1.1em;
          }

          .comment-post-title a {
            color: #2c5aa0;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
          }

          .comment-post-title a:hover {
            color: #1e3d6f;
            text-decoration: underline;
          }

          .comment-post-author {
            margin: 0;
            font-size: 0.9em;
            color: #6c757d;
          }


          .comment-content {
            color: #495057;
            line-height: 1.6;
            margin-bottom: 15px;
            padding: 12px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #c83434;
            font-style: italic;
          }

          .comment-actions {
            text-align: right;
          }

          .view-post-btn {
            background: #2c5aa0;
            color: white;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: 500;
            transition: all 0.3s ease;
            display: inline-block;
          }

          .view-post-btn:hover {
            background: #1e3d6f;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(44, 90, 160, 0.3);
          }
        `}</style>

        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const tabBtns = document.querySelectorAll('.tab-btn');
              const tabContents = document.querySelectorAll('.tab-content');
              
              tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                  const targetTab = this.dataset.tab;
                  
                  // Remove active class from all tabs and contents
                  tabBtns.forEach(b => b.classList.remove('active'));
                  tabContents.forEach(c => c.classList.remove('active'));
                  
                  // Add active class to clicked tab and corresponding content
                  this.classList.add('active');
                  document.getElementById(targetTab).classList.add('active');
                });
              });
            });
          `
        }} />
      </body>
    </html>
  );
}

module.exports = PublicProfile;