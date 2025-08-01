const React = require('react');
const Layout = require('../layouts/Layout');

function SignUp() {
  return (
    <Layout title="Sign Up - Travelogged">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form method="POST" action="/authors">
          <label>Name:</label>
          <input name="name" type="text" required />
          
          <label>Email:</label>
          <input name="email" type="email" required />
          
          <label>Password:</label>
          <input name="password" type="password" required />
          
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/authors/login">Log In</a>
        </p>
      </div>
    </Layout>
  );
}

module.exports = SignUp;
