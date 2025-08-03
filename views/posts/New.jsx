const React = require('react');

function New() {
  return (
    <html>
      <head>
        <title>Create New Travel Post</title>
        <link rel="stylesheet" href="/styles.css" />
        <script
        //scripy for uploading the photo
          dangerouslySetInnerHTML={{
            __html: `
              function previewImage(event) {
                const preview = document.getElementById('preview');
                preview.src = URL.createObjectURL(event.target.files[0]);
                preview.style.display = 'block';
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <h1>Share Your Travel Experience</h1>
          
          <form action="/posts" method="POST" encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="title">Travel Title:</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                required 
                placeholder="My Amazing Trip to..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input 
                type="text" 
                id="country" 
                name="country" 
                required 
                placeholder="Japan"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input 
                type="text" 
                id="city" 
                name="city" 
                required 
                placeholder="Tokyo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="travelDate">Travel Date:</label>
              <input 
                type="date" 
                id="travelDate" 
                name="travelDate" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration:</label>
              <input 
                type="text" 
                id="duration" 
                name="duration" 
                required 
                placeholder="5 days"
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Upload Image:</label>
              <input 
                //uploding
                type="file" 
                accept="image/*"
                id="imageUrl" 
                name="imageUrl"
                onChange="previewImage(event)"
              />
              <img id="preview" src="#" alt="Image Preview" style={{ display: 'none', maxWidth: '100%', marginTop: '10px' }} />
            </div>

            <div className="form-group">
              <label htmlFor="backgroundSoundUrl">Background Sound URL:</label>
              <input 
                type="url" 
                id="backgroundSoundUrl" 
                name="backgroundSoundUrl" 
                placeholder="https://example.com/sound.mp3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Your Travel Story:</label>
              <textarea 
                id="content" 
                name="content" 
                rows="5" 
                required 
                placeholder="Tell us about your amazing travel experience..."
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit">Share My Story</button>
              <a href="/posts" className="cancel-btn">Cancel</a>
            </div>
          </form>
        </div>

        <style jsx>{`
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .form-group {
            margin-bottom: 20px;
          }
          
          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }
          
          input, textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
          }
          
          textarea {
            resize: vertical;
          }
          
          .form-actions {
            display: flex;
            gap: 10px;
          }
          
          button {
            background-color: #007bff;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }
          
          button:hover {
            background-color: #0056b3;
          }
          
          .cancel-btn {
            background-color: #6c757d;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            display: inline-block;
          }
          
          .cancel-btn:hover {
            background-color: #545b62;
          }
        `}</style>
      </body>
    </html>
  );
}

module.exports = New;
