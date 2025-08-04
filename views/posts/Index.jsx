const React = require("react");

function Index({ posts, currentUser }) {
  return (
    <div>
      <h1>All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
            <h2>{post.title}</h2>
            <p>{post.city}, {post.country}</p>
            <p>
              By: {post.author?.name || "Unknown Author"}
            </p>
            <a href={`/posts/${post._id}`}>View Details</a>
          </div>
        ))
      )}
      <a href="/posts/new">Create New Post</a>
    </div>
  );
}

module.exports = Index;