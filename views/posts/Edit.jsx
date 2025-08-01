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
        <div className="container">
          <h1>Edit Your Travel Experience</h1>
          
          <form action={`/posts/${post._id}?_method=PUT`} method="POST">
            <div className="form-group">
              <label htmlFor="title">Travel Title:</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                required 
                defaultValue={post.title}
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
                defaultValue={post.country}
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
                defaultValue={post.city}
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
                defaultValue={formatDate(post.travelDate)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration:</label>
              <input 
                type="text" 
                id="duration" 
                name="duration" 
                required 
                defaultValue={post.duration}
                placeholder="5 days"
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Image URL:</label>
              <input 
                type="url" 
                id="imageUrl" 
                name="imageUrl" 
                defaultValue={post.imageUrl || ''}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="backgroundSoundUrl">Background Sound URL:</label>
              <input 
                type="url" 
                id="backgroundSoundUrl" 
                name="backgroundSoundUrl" 
                defaultValue={post.backgroundSoundUrl || ''}
                placeholder="https://example.com/sound.mp3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Your Travel Story:</label>
              <textarea 
                id="content" 
                name="content" 
                rows="10" 
                required 
                defaultValue={post.content}
                placeholder="Tell us about your amazing travel experience..."
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit">Update My Story</button>
              <a href={`/posts/${post._id}`} className="cancel-btn">Cancel</a>
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
            background-color: #28a745;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }
          
          button:hover {
            background-color: #218838;
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

module.exports = Edit;