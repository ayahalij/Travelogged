// views/auth/EditProfile.jsx
const React = require('react');

function EditProfile({ user, currentUser }) {
  return (
    <html>
      <head>
        <title>Edit Profile</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div className="page-container">
          <div className="main-card">
            <div className="card-header">
              <h1>Edit Profile</h1>
            </div>

            <div className="card-content">
              <div className="form-container">
                <form action="/profile?_method=PUT" method="POST" className="edit-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={user.name}
                      required
                      maxLength="100"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={user.email}
                      required
                      maxLength="255"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      defaultValue={user.bio || ''}
                      placeholder="Tell others about yourself and your travel experiences..."
                      maxLength="500"
                      rows="4"
                      className="form-textarea"
                    />
                    <div className="char-counter">
                      <span id="bioCount">0</span>/500 characters
                    </div>
                  </div>

                  <div className="form-actions">
                    <a href="/profile" className="cancel-btn">Cancel</a>
                    <button type="submit" className="save-btn">Save Changes</button>
                  </div>
                </form>
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
            padding: 40px;
          }

          .form-container {
            max-width: 100%;
          }

          .edit-form {
            display: flex;
            flex-direction: column;
            gap: 25px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
          }

          .form-group label {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
            font-size: 16px;
          }

          .form-input, .form-textarea {
            padding: 12px 16px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 16px;
            font-family: inherit;
            background-color: #f8f9fa;
            transition: all 0.3s ease;
          }

          .form-input:focus, .form-textarea:focus {
            outline: none;
            border-color: #2c5aa0;
            background-color: white;
            box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
          }

          .form-textarea {
            resize: vertical;
            min-height: 100px;
            line-height: 1.5;
          }

          .char-counter {
            margin-top: 5px;
            font-size: 14px;
            color: #6c757d;
            text-align: right;
          }

          .form-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 30px;
            flex-wrap: wrap;
          }

          .cancel-btn, .save-btn {
            padding: 14px 28px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 16px;
            text-decoration: none;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
            min-width: 140px;
          }

          .cancel-btn {
            background: #6c757d;
            color: white;
          }

          .cancel-btn:hover {
            background: #545b62;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
          }

          .save-btn {
            background: #2c5aa0;
            color: white;
          }

          .save-btn:hover {
            background: #1e3d6f;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(44, 90, 160, 0.3);
          }

          .save-btn:active {
            transform: translateY(0);
          }

          /* Mobile Responsive */
          @media (max-width: 768px) {
            .page-container {
              padding: 10px;
            }

            .main-card {
              border-radius: 12px;
            }

            .card-content {
              padding: 25px;
            }

            .form-actions {
              flex-direction: column;
              align-items: center;
            }

            .cancel-btn, .save-btn {
              width: 100%;
              max-width: 280px;
            }
          }

          @media (max-width: 480px) {
            .card-header {
              padding: 15px 20px;
            }

            .card-header h1 {
              font-size: 1.6em;
            }

            .card-content {
              padding: 20px;
            }

            .form-input, .form-textarea {
              font-size: 16px; /* Prevents zoom on iOS */
            }
          }
        `}</style>

        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const bioTextarea = document.getElementById('bio');
              const bioCounter = document.getElementById('bioCount');
              
              // Function to update character count
              function updateCharCount() {
                const currentLength = bioTextarea.value.length;
                bioCounter.textContent = currentLength;
                
                // Change color if approaching limit
                if (currentLength > 450) {
                  bioCounter.style.color = '#dc3545';
                } else if (currentLength > 400) {
                  bioCounter.style.color = '#ffc107';
                } else {
                  bioCounter.style.color = '#6c757d';
                }
              }
              
              // Initial count
              updateCharCount();
              
              // Update on input
              bioTextarea.addEventListener('input', updateCharCount);
              
              // Form validation
              const form = document.querySelector('.edit-form');
              form.addEventListener('submit', function(e) {
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                
                if (!name || !email) {
                  e.preventDefault();
                  alert('Please fill in all required fields.');
                  return;
                }
                
                if (name.length < 2) {
                  e.preventDefault();
                  alert('Name must be at least 2 characters long.');
                  return;
                }
                
                // Basic email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                  e.preventDefault();
                  alert('Please enter a valid email address.');
                  return;
                }
              });
            });
          `
        }} />
      </body>
    </html>
  );
}

module.exports = EditProfile;