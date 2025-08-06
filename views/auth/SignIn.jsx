const React = require('react');

function SignIn() {
  return (
    <html>
      <head>
        <title>Log In - Travelogged</title>
      </head>
      <body>
        <div className="auth-container">
        <div className="auth-card">
          <div className="card-header">
            <h1>Welcome Back!</h1>
            <p>Sign in to your travelogged account</p>
          </div>
          
          <div className="card-content">
            <form method="POST" action="/authors/login">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  name="email" 
                  id="email"
                  type="email" 
                  className="form-input"
                  placeholder="Enter your email"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  name="password" 
                  id="password"
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
                Don't have an account? <a href="/authors" className="auth-link">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`

      body{
          background: #f5f7fa;
      }

        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .auth-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 100%;
          max-width: 450px;
          border: 3px solid #2c5aa0;
        }

        @keyframes subtle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
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
        }

        .form-group {
          margin-bottom: 24px;
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
          margin-bottom: 24px;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }

        .switch-link {
          text-align: center;
        }

        .switch-link p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }

        .auth-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          margin-left: 4px;
          transition: all 0.3s ease;
        }

        .auth-link:hover {
          text-decoration: underline;
          color: #1d4ed8;
        }
      `}</style>
      </body>
    </html>
  );
}

module.exports = SignIn;