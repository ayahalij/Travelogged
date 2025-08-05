const React = require("react");

function Index({ posts, currentUser }) {
  return (
    <html>
      <head>
        <title>Travel Stories</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div className="page-container">
          <div className="main-card">
            <div className="card-header">
              <h1>Travel Stories</h1>
            </div>

            <div className="card-content">
              {/* Search Section */}
             <div className="search-section">
              <div className="search-bar-wrapper">
                <div className="search-container">
                  <div className="search-bar">
                    <span className="search-icon">🔎︎</span>
                    <input
                      type="text"
                      id="searchInput"
                      placeholder="Search by username, country, city, or title..."
                      className="search-input"
                    />
                    <button id="clearBtn" className="clear-btn" style={{ display: 'none' }}>
                      ✕
                    </button>
                  </div>
                  <p id="searchResults" className="search-results-text" style={{ display: 'none' }}></p>
                </div>

                <div className="create-post-section">
                  <a href="/posts/new" className="create-post-btn">
                    Share Your Travel Story
                  </a>
                </div>
              </div>
            </div>

              {/* Posts Container */}
              <div className="posts-container">
                <div id="noPostsMessage" className="no-posts" style={{ display: 'none' }}>
                  <div>
                    <p>No posts found matching your search.</p>
                  </div>
                </div>

                {posts.length === 0 ? (
                  <div className="no-posts">
                    <p>No posts available yet. Be the first to share your travel story!</p>
                  </div>
                ) : (
                  <div id="postsGrid" className="posts-grid">
                    {posts.map((post) => {
                      const likeCount = post.likes ? post.likes.length : 0;
                      return (
                        <div 
                          key={post._id} 
                          className="post-card"
                          data-username={(post.author?.name || '').toLowerCase()}
                          data-country={(post.country || '').toLowerCase()}
                          data-city={(post.city || '').toLowerCase()}
                          data-title={(post.title || '').toLowerCase()}
                        >
                          {/* Post Image */}
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
                            
                            {/* Like count overlay */}
                            <div className="like-overlay"> 
                              {likeCount}  ♡
                              <span className="like-count">
                              </span>
                            </div>

                            {/* Hover overlay with post info */}
                            <div className="hover-overlay">
                              <div className="hover-content">
                                <h4 className="hover-title">{post.title}</h4>
                                <div className="hover-author">
                                  <span className="author-icon"></span>
                                  {post.author?.name || "Unknown Author"}
                                </div>
                                <div className="hover-location">
                                  <span className="location-icon"></span>
                                  {post.city}, {post.country}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="form-actions">
               <a href="/authors" className="logout-btn">Log Out</a>
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

          .card-content {
            padding: 30px;
          }

          .search-section {
            margin-bottom: 40px;
            text-align: center;
          }

          .search-bar-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
          }

          .search-container {
            flex: 1;
            min-width: 300px;
          }

          .search-bar {
            position: relative;
            margin-bottom: 10px;
          }
          
          .search-icon {
            position: absolute;
            left: 15px;
            top: 48%;
            transform: translateY(-50%);
            color: #c83434;
            pointer-events: none;
            font-size: 20px;
            z-index: 2;
          }

          .search-input {
            width: 100%;
            padding: 15px 50px 15px 45px;
            font-size: 16px;
            border: 2px solid #e9ecef;
            background-color: #f8f9fa;
            border-radius: 25px;
            outline: none;
            transition: all 0.3s ease;
            box-sizing: border-box;
          }

          .search-input:focus {
            border-color: #3498db;
            background-color: white;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
          }

          .clear-btn {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 18px;
            color: #95a5a6;
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }

          .clear-btn:hover {
            background-color: #e9ecef;
            color: #6c757d;
          }

          .search-results-text {
            color: #6c757d;
            font-size: 14px;
            margin: 0;
            text-align: left;
            padding-left: 15px;
          }

          .create-post-section {
            margin-bottom: 10px;
            flex-shrink: 0;
          }

          .create-post-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #2c5aa0;
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(44, 90, 160, 0.3);
          }

          .create-post-btn:hover {
            background: #1e3d6f;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(44, 90, 160, 0.4);
          }

          .posts-container {
            margin-top: 30px;
          }

          .no-posts {
            text-align: center;
            padding: 60px 20px;
            color: #6c757d;
            background-color: #f8f9fa;
            border-radius: 12px;
            border: 2px dashed #dee2e6;
          }

          .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 25px;
            margin-top: 20px;
          }

          .post-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 2px solid #e9ecef;
          }

          .post-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            border-color: #c83434;
          }

          .post-card.hidden {
            display: none;
          }

          .post-image-container {
            position: relative;
            height: 240px;
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
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 500;
          }

          .no-image-placeholder p {
            margin: 0;
            font-size: 16px;
          }

          .like-overlay {
            position: absolute;
            top: 12px;
            right: 12px;
            background: #c8343479;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            backdrop-filter: blur(15px);
            z-index: 2;
          }

          .like-count {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          /* Hover overlay styles */
          .hover-overlay {
            position: absolute;
            bottom: 0;
            left: 0; 
            right: 0;
            height: 50%;
            background: linear-gradient(to top, rgba(200,52,52, 0.9), rgba(200,52,52, 0.7), transparent);
            color: white;
            opacity: 0;
            transform: translateY(100%);
            transition: all 0.3s ease;
            display: flex;
            align-items: flex-end;
            padding: 20px;
            z-index: 1;
          }

          .post-image-container:hover .hover-overlay {
            opacity: 1;
            transform: translateY(0);
          }

          .hover-content {
            width: 100%;
          }

          .hover-title {
            margin: 0 0 8px 0;
            font-size: 1.1em;
            font-weight: 600;
            color: white;
            line-height: 1.3;
          }

          .hover-author, .hover-location {
            display: flex;
            align-items: center;
            margin-bottom: 4px;
            color: rgba(255, 255, 255, 0.9);
            font-size: 13px;
          }

          .hover-author .author-icon,
          .hover-location .location-icon {
            margin-right: 6px;
            font-size: 14px;
          }

          .form-actions {
            display: flex;
            justify-content: center;
            margin: 10px;
            padding: 20px;
            border-top: 1px solid #e9ecef;
          }

          .logout-btn{
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 25px;
            display: inline-flex;
            align-items: center;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            background: #6c757d;
          }

          .logout-btn:hover{
            background: #545b62;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
          }

          /* Mobile Responsive */
          @media (max-width: 968px) {
            .page-container {
              padding: 15px;
            }

            .main-card {
              margin: 0;
              border-radius: 12px;
            }

            .card-header {
              padding: 20px;
            }

            .card-header h1 {
              font-size: 2em;
            }

            .card-content {
              padding: 20px;
            }

            .posts-grid {
              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
              gap: 20px;
            }
          }

          @media (max-width: 768px) {
            .posts-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .search-input {
              font-size: 16px; /* Prevents zoom on iOS */
            }

            .hover-overlay {
              padding: 15px;
            }

            .hover-title {
              font-size: 1em;
            }

            .form-actions {
              flex-direction: column;
              align-items: center;
            }
          }

          @media (max-width: 480px) {
            .page-container {
              padding: 10px;
            }

            .card-header {
              padding: 15px;
            }

            .card-header h1 {
              font-size: 1.8em;
            }

            .card-content {
              padding: 15px;
            }

            .post-card {
              margin: 0;
            }

            .hover-overlay {
              padding: 12px;
            }

            .hover-title {
              font-size: 0.9em;
            }

            .hover-author, .hover-location {
              font-size: 12px;
            }

            .create-post-btn {
              width: 100%;
              max-width: 280px;
              justify-content: center;
            
            .form-actions {
              margin: 20px 10px;
            }

            }
          }
        `}</style>

        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const searchInput = document.getElementById('searchInput');
              const clearBtn = document.getElementById('clearBtn');
              const searchResults = document.getElementById('searchResults');
              const noPostsMessage = document.getElementById('noPostsMessage');
              const postsGrid = document.getElementById('postsGrid');
              const postCards = document.querySelectorAll('.post-card');
              
              function filterPosts() {
                const query = searchInput.value.toLowerCase().trim();
                let visibleCount = 0;
                
                postCards.forEach(card => {
                  const username = card.dataset.username || '';
                  const country = card.dataset.country || '';
                  const city = card.dataset.city || '';
                  const title = card.dataset.title || '';
                  
                  const matches = username.includes(query) || 
                                 country.includes(query) || 
                                 city.includes(query) ||
                                 title.includes(query);
                  
                  if (query === '' || matches) {
                    card.classList.remove('hidden');
                    visibleCount++;
                  } else {
                    card.classList.add('hidden');
                  }
                });
                
                // Show/hide clear button
                clearBtn.style.display = query ? 'flex' : 'none';
                
                // Show/hide search results text
                if (query) {
                  searchResults.textContent = \`Found \${visibleCount} result\${visibleCount !== 1 ? 's' : ''} for "\${query}"\`;
                  searchResults.style.display = 'block';
                } else {
                  searchResults.style.display = 'none';
                }
                
                // Show/hide no results message
                if (query && visibleCount === 0) {
                  noPostsMessage.style.display = 'block';
                  postsGrid.style.display = 'none';
                } else {
                  noPostsMessage.style.display = 'none';
                  postsGrid.style.display = 'grid';
                }
              }
              
              function clearSearch() {
                searchInput.value = '';
                filterPosts();
                searchInput.focus();
              }
              
              // Event listeners
              searchInput.addEventListener('input', filterPosts);
              clearBtn.addEventListener('click', clearSearch);
              
              // Allow clearing with Escape key
              searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                  clearSearch();
                }
              });
            });
          `
        }} />
      </body>
    </html>
  );
}

module.exports = Index;