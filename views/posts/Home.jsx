const React = require('react');

function Home() {
  return (
    <html>
      <head>
        <title>Travelogged - Share Your Travel Stories</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1 className="logo">Travelogged</h1>
            <a href="/authors" className="login-signup-btn">Signup / Login</a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-image">
                <image src='/HomePagePhoto2.jpg' className="hero-image"></image>

            </div>
            <div className="hero-text">
              <h2 className="heading">Welcome to <span className="highlight">Travelogged</span></h2>
              <p className="hero-description">
                <span className="highlight">Travelogged</span>, is your digital travel diary — a place where your journeys become timeless memories. Whether you're exploring new lands or revisiting favorite places, share your experiences with the world and keep them safe for years to come.
              </p>
              <a href="#about-section" className="learn-more-btn">Learn more about Travelogged</a>

            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="steps">
          <div className="steps-content">
            <h2 className="steps-title">Four Steps to Use <span className="highlight">Travelogged</span></h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-icon">
                    <p>✈︎</p>
                </div>
                <div className="step-text">
                  <h3>Travel</h3>
                  <p>Explore the world and create unforgettable moments.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </div>
                <div className="step-text">
                  <h3>Capture</h3>
                  <p>Snap your favorite memories on the go.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon">
                  <p>✍︎</p>
                </div>
                <div className="step-text">
                  <h3>Blog</h3>
                  <p>Write your story, share your feelings and experience.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon">
                  <p>➢</p>
                </div>
                <div className="step-text">
                  <h3>Share</h3>
                  <p>Let others discover your adventures.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about" id="about-section">
          <div className="about-content">
            <h2 className="about-title">About <span className="highlight">Travelogged</span></h2>
            <p className="about-description">
                <span className="highlight">Travelogged</span> is more than a blog — it's a space to preserve your travel memories, emotions, and unique experiences. Whether you're writing about a weekend getaway or a life-changing trip, your story matters. Travelogged lets you document your adventures in words and images, and share them with others who can like, comment, and connect. Come back anytime to relive your travels — your memories are always here.            
                </p>
            <a href="/authors" className="member-btn">Be a member</a>
          </div>
        </section>

        <style jsx>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f0f0f0;
            color: #333;
          }

          /* Header */
          .header {
            background-color: #ffffffff;
            padding: 20px 0;
            border-bottom: 1px solid #ddd;
          }

          .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            font-size: 40px;
            font-weight: bold;
            color: #2c5aa0;
            margin: 0;
          }

          .login-signup-btn {
            background-color: #c83434;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 20px;
            text-decoration: none;
            font-size: 18px;
            transition: background-color 0.3s ease;
          }

          .login-signup-btn:hover {
            background-color: #c83434;
          }

          /* Hero Section */
          .hero {
            background-color: #f0f0f0;
            padding: 60px 0;
          }

          .hero-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
            gap: 60px;
          }

          .hero-image {
            justify-content: center;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            object-fit: cover;
            box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, #5e201f35 0px 50px 100px -20px, rgba(0, 0, 0, 0.19) 0px 30px 60px -30px;
          }


          .hero-text {
            flex: 1;
            text-align: center;
          }

          .heading {
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #333;
          }

          .hero-description {
            font-size: 17px;
            line-height: 1.6;
            margin-bottom: 30px;
            color: #666;
            padding-bottom:15px;
          }

          .highlight {
            color: #2c5aa0;
            font-weight: bold;
          }

          .learn-more-btn {
            background-color: #c83434;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .learn-more-btn:hover {
            background-color: #a61a28ff;
          }

          /* Steps Section */
          .steps {
            background-color: white;
            padding: 40px 0;
            border-top: 1px solid #ddd;
            height:300px;
          }

          .steps-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .steps-title {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 40px;
            color: #333;
          }

          .steps-grid {
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 20px;
          }

          .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: relative;
          }

          .step-icon {
            width: 90px;
            height: 90px;
            background-color: #2c5aa0;
            border:7px solid #1e3d6f;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: all 0.3s ease;
            cursor: pointer;
            font-size:45px;
            color: #fcf7f7ff;
          }

          .step-icon:hover {
                      box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, #5e201f35 0px 50px 100px -20px, rgba(0, 0, 0, 0.19) 0px 30px 60px -30px;

            transform: translateY(-5px);
            box-shadow: 0 5px 5px #5e201f86;
            box-shadow: 5e201f86 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
          }

          .step-icon svg {
            width: 40px;
            height: 40px;
          }

          .step-text {
            position: absolute;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            background: white;
            padding: 10px 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            white-space: nowrap;
            z-index: 10;
          }

          .step:hover .step-text {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(-10px);
          }

          .step-text h3 {
            font-size: 16px;
            font-weight: bold;
            color: #c83434;
            margin-bottom: 4px;
          }

          .step-text p {
            font-size: 14px;
            color: #666;
            margin: 0;
          }

          /* About Section */
          .about {
            background-color: #f0f0f0;
            padding: 60px 0;
            border-top: 1px solid #ddd;
          }

          .about-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            text-align: left;
          }

          .about-title {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #333;
          }

          .about-description {
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 30px;
            color: #666;
            text-align: justify;
            max-width:1100px ;
            padding-left: 50px;
          }

          .member-btn {
            background-color: #c83434;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.3s ease;
          }

          .member-btn:hover {
            background-color: #a61a28ff;
          }

        `}</style>
      </body>
    </html>
  );
}

module.exports = Home;