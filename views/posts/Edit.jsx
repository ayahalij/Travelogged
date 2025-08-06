const React = require('react');

function Edit({ post }) {
  // Format the date for the input field
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  return (
    <html>
      <head>
        <title>Edit Travel Post</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div className="page-container">
          <div className="form-card">

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
                  <a href="/posts/new" className="nav-link">
                    <span className="nav-icon">✦</span>
                    Create Post
                  </a>
                  <a href="/profile" className="nav-link">
                    <span className="nav-icon">☰</span>
                    Profile
                  </a>
                  <a href="/" className="nav-link logout">
                    <span className="nav-icon">⍈</span>
                    Log Out
                  </a>
                </div>
              </div>
            </nav>

            <div className="card-header">
              <h1>Edit Your Travel Experience</h1>
            </div>
            
            <form action={`/posts/${post._id}?_method=PUT`} method="POST" className="form-content">
              {/* Hidden method field as backup */}
              <input type="hidden" name="_method" value="PUT" />
              
              {/* Title - Full Width */}
              <div className="form-group full-width">
                <label htmlFor="title">Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  required 
                  defaultValue={post.title || ''}
                  placeholder="My Amazing Trip to..."
                />
              </div>

              {/* Country and City - Side by Side */}
              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="country">Country</label>
                  <input 
                    type="text" 
                    id="country" 
                    name="country" 
                    required 
                    defaultValue={post.country || ''}
                    placeholder="Japan"
                  />
                </div>

                <div className="form-group half-width">
                  <label htmlFor="city">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    name="city" 
                    required 
                    defaultValue={post.city || ''}
                    placeholder="Tokyo"
                  />
                </div>
              </div>

              {/* Date and Duration - Side by Side */}
              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="travelDate">Date</label>
                  <input 
                    type="date" 
                    id="travelDate" 
                    name="travelDate" 
                    required 
                    defaultValue={formatDate(post.travelDate)}
                  />
                </div>

                <div className="form-group half-width">
                  <label htmlFor="duration">Duration</label>
                  <input 
                    type="text" 
                    id="duration" 
                    name="duration" 
                    required 
                    defaultValue={post.duration || ''}
                    placeholder="5 days"
                  />
                </div>
              </div>

              {/* Image Upload and Background Sound - Side by Side */}
              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="imageUrl">Image</label>
                  <div className="file-input-container">
                    <input 
                      type="file" 
                      accept="image/*"
                      id="imageUrl" 
                      name="imageUrl"
                      onChange="previewImage(event)"
                      className="file-input"
                    />
                    <div className="file-input-label">
                      <span>🗁 Choose New Image (Optional)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Image Display */}
              {post.imageUrl && (
                <div className="form-group full-width">
                  <label>Current Image</label>
                  <img 
                    src={post.imageUrl} 
                    alt="Current post image" 
                    className="current-image"
                  />
                  <input type="hidden" name="currentImageUrl" value={post.imageUrl} />
                </div>
              )}

              {/* Comment - Full Width */}
              <div className="form-group full-width">
                <label htmlFor="content">Comment</label>
                <textarea 
                  id="content" 
                  name="content" 
                  rows="6" 
                  required 
                  defaultValue={post.content || ''}
                  placeholder="Tell us about your amazing travel experience..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button type="submit" className="submit-btn">Update My Story</button>
                <a href={`/posts/${post._id}`} className="cancel-btn">Cancel</a>
              </div>
            </form>
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
            align-items: center;
            min-height: calc(100vh - 40px);
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

          .form-card {
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

          .form-content {
            padding: 30px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-row {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
          }

          .full-width {
            width: 100%;
          }

          .half-width {
            flex: 1;
          }

          label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2c3e50;
            font-size: 14px;
          }

          input, textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 14px;
            background-color: #f8f9fa;
            transition: all 0.3s ease;
          }

          input:focus, textarea:focus {
            outline: none;
            border-color: #3498db;
            background-color: white;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
          }

          textarea {
            resize: vertical;
            min-height: 120px;
          }

          .file-input-container {
            position: relative;
          }

          .file-input {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            z-index: 2;
          }

          .file-input-label {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px 16px;
            border: 2px dashed #c83434;
            border-radius: 8px;
            background-color: #f8f9fa;
            color: #6c757d;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .file-input-label:hover {
            border-color: #3498db;
            background-color: #e3f2fd;
          }

          .current-image {
            max-width: 100%;
            max-height: 200px;
            border-radius: 8px;
            border: 2px solid #e9ecef;
            object-fit: cover;
            display: block;
          }

          .form-actions {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
          }

          .submit-btn {
            background: #2c5aa0;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .submit-btn:hover {
            background: #1e3d6f;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(44, 90, 160, 0.3);
          }

          .cancel-btn {
            background: #6c757d;
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

          .cancel-btn:hover {
            background: #545b62;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
          }
        `}</style>
      </body>
    </html>
  );
}

module.exports = Edit;