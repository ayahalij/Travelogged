const React = require('react');
const Layout = require('../layouts/Layout');

function Index(props) {
  const { posts, userId } = props;
  return (
    <Layout title="All Travel Posts" userId={userId}>
      <h2>Travelogged Posts</h2>
      {/* Add Create button */}
      <div style={{ marginBottom: '1rem' }}>
        <a href="/posts/new" className="btn btn-primary">Create</a>
      </div>
      <form method="GET" action="/search" className="search-form">
        <input type="text" name="q" placeholder="Search by user, country, or city" />
        <button type="submit">Search</button>
      </form>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
            <h3><a href={`/posts/${post._id}`}>{post.title}</a></h3>
            <p>
              <strong>Location:</strong> {post.city}, {post.country}
            </p>
            <p>
              <strong>Duration:</strong> {post.duration}
            </p>
            <p>{post.content.substring(0, 100)}...</p>
            <p>
              Likes: {post.likes.length} | Comments: {post.comments.length}
            </p>
            {userId === post.author._id.toString() && (
              <div className="post-actions">
                <a href={`/posts/${post._id}/edit`}>Edit</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

module.exports = Index;
