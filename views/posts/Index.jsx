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
            <a href={`/posts/${post._id}`}>View</a> |{" "}
            <a href={`/posts/${post._id}/edit`}>Edit</a>
            {/* Only show delete if the current user is the author */}

  <form action={`/posts/${post._id}?_method=DELETE`} method="POST">
  <button type="submit">Delete</button>

</form>

            {/* {post.author?._id?.toString() === currentUser?._id?.toString() && (
              <>
                {" | "}
                <form   action={`/posts/${post._id}?_method=DELETE`}
                        method="POST"
                        style={{ display: "inline" }}>

                <button type="submit">Delete</button>
                </form>
              </>
            )} */}
          </div>
        ))
      )}
      <a href="/posts/new">Create New Post</a>
    </div>
  );
}

module.exports = Index;