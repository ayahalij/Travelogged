const React = require('react');

function Layout(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>{props.title || 'Travelogged'}</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <header>
          <h1><a href="/">Travelogged</a></h1>
          {props.userId ? (
            <nav>
              <a href="/logout">Logout</a>
              <a href="/posts/new">New Post</a>
            </nav>
          ) : (
            <nav>
            </nav>
          )}
        </header>
        <main>{props.children}</main>
        <footer>
          <p>© 2025 Travelogged</p>
        </footer>
      </body>
    </html>
  );
}

module.exports = Layout