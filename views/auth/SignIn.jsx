const React = require('react');
const Layout = require('../layouts/Layout');

function SignIn() {
  return (
    <Layout title="Log In - Travelogged">
      <div className="auth-card">
        <h2>Log In</h2>
        <form method="POST" action="/authors/login">
          <label>Email:</label>
          <input name="email" type="email" required />
          
          <label>Password:</label>
          <input name="password" type="password" required />
          
          <button type="submit">Log In</button>
        </form>
        <p>
          Don't have an account? <a href="/authors">Sign Up</a>
        </p>
      </div>
    </Layout>
  );
}

module.exports = SignIn;
