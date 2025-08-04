const React = require("react");

function Index({ posts, currentUser }) {
  return (
    <div className="posts-index">
      <div className="header-section">
        <h1>Travel Stories</h1>
        
        {/* Search Bar */}
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
          <p id="searchResults" className="search-results-text" style={{ display: 'none' }}>
          </p>
        </div>            
        <div className="create-post-section">
        <a href="/posts/new" className="create-post-btn">
          Share Your Travel Story
        </a>
      </div>
      </div>


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

                  {/* Post Content */}
                    
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .posts-index {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header-section {
          text-align: center;
          margin-bottom: 40px;
        }

        h1 {
          color: #2c3e50;
          font-size: 2.5em;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .search-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .search-bar {
          position: relative;
          margin-bottom: 10px;
        }
        
        .search-icon {
          position: absolute;
          left: 10px;
          top: 48%;
          transform: translateY(-50%);
          color: #c83434;
          pointer-events: none;
          font-size: 25px;
        }

        .search-input {
          padding-left: 20px;
          width: 100%;
          padding: 15px 50px 15px 40px;
          font-size: 16px;
          border: 2px solid #c83434;
          background-color: #f2f1f1;
          border-radius: 30px;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .search-input:focus {
          border-color: #3498db;
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

        .search-results-text {
          color: #7f8c8d;
          font-size: 14px;
          margin: 0;
          text-align: left;
        }

        .posts-container {
          margin-bottom: 40px;
        }

        .no-posts {
          text-align: center;
          padding: 60px 20px;
          color: #7f8c8d;
          background-color: #f8f9fa;
          border-radius: 12px;
          border: 2px dashed #dee2e6;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }

        .post-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          transition: all 0.3s ease;
          border: 2px solid #c83434;
        }

        .post-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
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
          background: #3385cf;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .no-image-placeholder span {
          font-size: 40px;
          margin-bottom: 10px;
        }

        .no-image-placeholder p {
          margin: 0;
          font-weight: 500;
        }

        .like-overlay {
          position: absolute;
          top: 12px;
          right: 12px;
          background:rgba(183, 47, 47, 0.27);
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

        .post-content {
          padding: 20px;
        }

        .create-post-section {
        
          text-align: center;
          padding-top:10px;
        }

        .create-post-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #004d8d;
          color: white;
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .create-post-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
        }

        @media (max-width: 768px) {
          .posts-index {
            padding: 15px;
          }

          h1 {
            font-size: 2em;
          }

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
        }

        @media (max-width: 480px) {
          .post-card {
            margin: 0 -5px;
          }
          
          .post-content {
            padding: 15px;
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
    </div>
  );
}

module.exports = Index;