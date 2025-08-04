const React = require("react");

function Index({ posts, currentUser }) {
  return (
    <div className="posts-index">
      <div className="header-section">
        <h1>Travel Stories</h1>
        
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
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
      </div>

      <div className="posts-container">
        <div id="noPostsMessage" className="no-posts" style={{ display: 'none' }}>
          <div>
            <p>No posts found matching your search.</p>
            <button id="clearSearchBtn" className="clear-search-btn">
              Clear search
            </button>
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
                    {post.imageUrl ? (
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="post-image"
                      />
                    ) : (
                      <div className="no-image-placeholder">
                        <span></span>
                        <p>No Image</p>
                      </div>
                    )}
                    
                    {/* Like count overlay */}
                    <div className="like-overlay">
                      <span className="like-count">
                        ❤️ {likeCount}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="post-content">
                    <h3 className="post-title">{post.title}</h3>
                    
                    <div className="post-location">
                      <span className="location-icon"></span>
                      {post.city}, {post.country}
                    </div>
                    
                    <div className="post-author">
                      <span className="author-icon"></span>
                      By: {post.author?.name || "Unknown Author"}
                    </div>

                    {post.travelDate && (
                      <div className="post-date">
                        <span className="date-icon"></span>
                        {new Date(post.travelDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    )}

                    {post.content && (
                      <p className="post-preview">
                        {post.content.length > 150 
                          ? post.content.substring(0, 150) + '...' 
                          : post.content
                        }
                      </p>
                    )}

                    <a href={`/posts/${post._id}`} className="view-details-btn">
                      View Details →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="create-post-section">
        <a href="/posts/new" className="create-post-btn">
          ✈️ Share Your Travel Story
        </a>
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

        .search-input {
          width: 100%;
          padding: 15px 50px 15px 20px;
          font-size: 16px;
          border: 2px solid #e1e8ed;
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

        .clear-btn:hover {
          background-color: #ecf0f1;
          color: #e74c3c;
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

        .clear-search-btn {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }

        .clear-search-btn:hover {
          background-color: #2980b9;
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
          border: 1px solid #f1f3f4;
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
          height: 200px;
          overflow: hidden;
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
          background: #3fc187ff;
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
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .like-count {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .post-content {
          padding: 20px;
        }

        .post-title {
          margin: 0 0 12px 0;
          font-size: 1.3em;
          font-weight: 600;
          color: #2c3e50;
          line-height: 1.3;
        }

        .post-location, .post-author, .post-date {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          color: #5a6c7d;
          font-size: 14px;
        }

        .location-icon, .author-icon, .date-icon {
          margin-right: 6px;
          font-size: 16px;
        }

        .post-preview {
          color: #6c757d;
          line-height: 1.5;
          margin: 15px 0;
          font-size: 14px;
        }

        .view-details-btn {
          display: inline-flex;
          align-items: center;
          color: #3498db;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .view-details-btn:hover {
          color: #2980b9;
          transform: translateX(5px);
        }

        .create-post-section {
          text-align: center;
          padding: 40px 0;
        }

        .create-post-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #3fc187ff;
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
        }

        @media (max-width: 480px) {
          .post-card {
            margin: 0 -5px;
          }
          
          .post-content {
            padding: 15px;
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
            const clearSearchBtn = document.getElementById('clearSearchBtn');
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
            clearSearchBtn.addEventListener('click', clearSearch);
            
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