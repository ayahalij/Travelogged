const React = require('react');
const Layout = require('../layouts/Layout');

function Show(props) {
  const { post, userId } = props;
  return (
    <Layout title={post.title} userId={userId}>
      <h2>{post.title}</h2>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      <p>
        <strong>Location:</strong> {post.city}, {post.country}
      </p>
      <p>
        <strong>Travel Date:</strong> {new Date(post.travelDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Duration:</strong> {post.duration}
      </p>
      {post.backgroundSoundUrl && (
        <audio controls autoPlay loop>
          <source src={post.backgroundSoundUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      <p>{post.content}</p>
      <p>Likes: {post.likes.length}</p>
      <form method="POST" action={`/posts/${post._id}/like`}>
        <button type="submit">Like</button>
      </form>
      {userId === post.author._id.toString() && (
        <>
          <a href={`/posts/${post._id}/edit`}>Edit</a>
          <form method="POST" action={`/posts/${post._id}?_method=DELETE`}>
            <button type="submit">Delete</button>
          </form>
        </>
      )}
      <section>
        <h3>Comments</h3>
        {post.comments.map((comment) => (
          <div key={comment._id} className="comment">
            <strong>{comment.commenter.username}:</strong> {comment.content}
          </div>
        ))}
        <form method="POST" action={`/posts/${post._id}/comment`}>
          <textarea name="content" required placeholder="Add a comment..."></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>
    </Layout>
  );
}

module.exports = Show;
