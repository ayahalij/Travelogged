const React = require('react');
const Layout = require('../layouts/Layout');

function FlipCardAuth() {
  return (
    <Layout title="Authentication - Travelogged">
      <div className="auth-container">
        <div className="flip-card" id="flipCard">
          <div className="flip-card-inner">
            
            {/* FRONT SIDE - LOGIN */}
            <div className="flip-card-front">
              <div className="card-header">
                <h1>Welcome Back!</h1>
                <p>Sign in to your travel account</p>
              </div>
              
              <div className="card-content">
                <form method="POST" action="/authors/login">
                  <div className="form-group">
                    <label htmlFor="loginEmail">Email</label>
                    <input 
                      name="email" 
                      id="loginEmail"
                      type="email" 
                      className="form-input"
                      placeholder="Enter your email"
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input 
                      name="password" 
                      id="loginPassword"
                      type="password" 
                      className="form-input"
                      placeholder="Enter your password"
                      required 
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary">Log In</button>
                </form>
                
                <div className="switch-link">
                  <p>
                    Don't have an account? 
                    <button 
                      type="button" 
                      className="flip-btn"
                      onClick="flipToSignup()"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* BACK SIDE - SIGNUP */}
            <div className="flip-card-back">
              <div className="card-header">
                <h1>Join Our Community!</h1>
                <p>Create your travel account today</p>
              </div>
              
              <div className="card-content">
                <form method="POST" action="/authors">
                  <div className="form-group">
                    <label htmlFor="signupName">Name</label>
                    <input 
                      name="name" 
                      id="signupName"
                      type="text" 
                      className="form-input"
                      placeholder="Enter your full name"
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="signupEmail">Email</label>
                    <input 
                      name="email" 
                      id="signupEmail"
                      type="email" 
                      className="form-input"
                      placeholder="Enter your email"
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="signupPassword">Password</label>
                    <input 
                      name="password" 
                      id="signupPassword"
                      type="password" 
                      className="form-input"
                      placeholder="Create a password"
                      required 
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary">Sign Up</button>
                </form>
                
                <div className="switch-link">
                  <p>
                    Already have an account? 
                    <button 
                      type="button" 
                      className="flip-btn"
                      onClick="flipToLogin()"
                    >
                      Log In
                    </button>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            function flipToSignup() {
              document.getElementById('flipCard').classList.add('flipped');
            }
            
            function flipToLogin() {
              document.getElementById('flipCard').classList.remove('flipped');
            }
            
            // Optional: Add keyboard support
            document.addEventListener('keydown', function(e) {
              if (e.key === 'Tab' && e.ctrlKey) {
                e.preventDefault();
                const card = document.getElementById('flipCard');
                if (card.classList.contains('flipped')) {
                  flipToLogin();
                } else {
                  flipToSignup();
                }
              }
            });
          `,
        }}
      />

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .flip-card {
          background-color: transparent;
          perspective: 1000px;
          width: 100%;
          max-width: 450px;
          height: 550px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }

        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 3px solid #2c5aa0;
          background: white;
          overflow: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        .card-header {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          color: white;
          padding: 32px 24px;
          text-align: center;
        }

        .card-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
        }

        .card-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 16px;
        }

        .card-content {
          padding: 32px 24px;
          height: calc(100% - 128px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .form-group {
          margin-bottom: 24px;
          text-align: left;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s ease;
          box-sizing: border-box;
          background: #f9fafb;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .btn-primary {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }

        .switch-link {
          text-align: center;
          margin-top: auto;
        }

        .switch-link p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }

        .flip-btn {
          background: none;
          border: none;
          color: #3b82f6;
          cursor: pointer;
          font-weight: 600;
          text-decoration: none;
          margin-left: 4px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .flip-btn:hover {
          text-decoration: underline;
          color: #1d4ed8;
        }

        /* Hover effect for the entire card */
        .flip-card:hover .flip-card-inner {
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        /* Loading animation when flipping */
        .flip-card-inner {
          animation: subtle-float 6s ease-in-out infinite;
        }

        @keyframes subtle-float {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-5px) rotateY(0deg); }
        }

        .flip-card.flipped .flip-card-inner {
          animation: subtle-float-flipped 6s ease-in-out infinite;
        }

        @keyframes subtle-float-flipped {
          0%, 100% { transform: translateY(0px) rotateY(180deg); }
          50% { transform: translateY(-5px) rotateY(180deg); }
        }

        /* Mobile Responsive */
        @media (max-width: 480px) {
          .auth-container {
            padding: 10px;
          }

          .flip-card {
            max-width: 100%;
            height: 500px;
          }

          .card-content {
            padding: 24px 20px;
          }

          .card-header {
            padding: 24px 20px;
          }

          .card-header h1 {
            font-size: 24px;
          }

          .form-input {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .flip-card-inner {
            transition: transform 0.3s ease;
            animation: none;
          }
          
          .flip-card.flipped .flip-card-inner {
            animation: none;
          }
        }

        /* Focus indicators for better accessibility */
        .flip-btn:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
}

module.exports = FlipCardAuth;