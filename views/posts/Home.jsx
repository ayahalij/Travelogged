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
            <a href="/authors" className="login-signup-btn">Signup</a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-image">
                <image src=''></image>
            
            </div>
            <div className="hero-text">
              <h2 className="heading">Welcome to <span className="highlight">Travelogged</span></h2>
              <p className="hero-description">
                <span className="highlight">Travelogged</span>, is your digital travel diary — a place where your journeys become timeless memories. Whether you're exploring new lands or revisiting favorite places, share your experiences with the world and keep them safe for years to come.
              </p>
              <a href="#about-section" className="learn-more-btn">Learn more about it Travelogged</a>

            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="steps">
          <div className="steps-content">
            <h2 className="steps-title">Four Steps to Use Travelogged</h2>
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
            font-size: 24px;
            font-weight: bold;
            color: #4a90e2;
            margin: 0;
          }

          .login-signup-btn {
            background-color: #a94442;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 20px;
            text-decoration: none;
            font-size: 14px;
            transition: background-color 0.3s ease;
          }

          .login-signup-btn:hover {
            background-color: #843534;
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
            border:red;
            flex: 1;
            display: flex;
            justify-content: center;
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
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
            color: #666;
          }

          .highlight {
            color: #4a90e2;
            font-weight: bold;
          }

          .learn-more-btn {
            background-color: #a94442;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .learn-more-btn:hover {
            background-color: #843534;
          }

          /* Steps Section */
          .steps {
            background-color: white;
            padding: 60px 0;
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
            width: 80px;
            height: 80px;
            background-color: #4a90e2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: all 0.3s ease;
            cursor: pointer;
            font-size:45px;
          }

          .step-icon:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(74, 144, 226, 0.3);
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
            color: #333;
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
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
            color: #666;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .member-btn {
            background-color: #a94442;
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
            background-color: #843534;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .hero-content {
              flex-direction: column;
              gap: 40px;
            }

            .heading {
              font-size: 36px;
            }

            .steps-grid {
              flex-wrap: wrap;
              gap: 30px;
            }

            .step {
              min-width: 120px;
            }
          }

          @media (max-width: 480px) {
            .header-content {
              padding: 0 15px;
            }

            .hero-content, .steps-content, .about-content {
              padding: 0 15px;
            }


            .heading {
              font-size: 28px;
            }

            .steps-grid {
              gap: 20px;
            }

            .step-icon {
              width: 60px;
              height: 60px;
            }

            .step-icon svg {
              width: 30px;
              height: 30px;
            }
          }
        `}</style>
      </body>
    </html>
  );
}

module.exports = Home;