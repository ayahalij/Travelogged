const React = require('react');

function New() {
  return (
    <html>
      <head>
        <title>Create New Travel Post</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div className="page-container">
          <div className="form-card">
            <div className="card-header">
              <h1>Share Your Travel Experience</h1>
            </div>
            
            <form action="/posts" method="POST" encType="multipart/form-data" className="form-content">
              {/* Title - Full Width */}
              <div className="form-group full-width">
                <label htmlFor="title">Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  required 
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
                  />
                </div>

                <div className="form-group half-width">
                  <label htmlFor="duration">Duration</label>
                  <input 
                    type="text" 
                    id="duration" 
                    name="duration" 
                    required 
                    placeholder="5 days"
                  />
                </div>
              </div>

              {/* Image Upload - Side by Side */}
              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="imageUrl">Image</label>
                  <div className="file-input-container">
                    <input 
                      type="file" 
                      accept="image/*"
                      id="imageUrl" 
                      name="imageUrl"
                      className="file-input"
                    />
                    <div className="file-input-label">
                      <span>🗁 Choose Image</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment - Full Width */}
              <div className="form-group full-width">
                <label htmlFor="content">Blog</label>
                <textarea 
                  id="content" 
                  name="content" 
                  rows="4" 
                  required 
                  placeholder="Tell us about your amazing travel experience..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button type="submit" className="submit-btn">Create new blog</button>
                <a href="/posts" className="cancel-btn">Cancel</a>
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
            min-height: 100px;
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

module.exports = New;