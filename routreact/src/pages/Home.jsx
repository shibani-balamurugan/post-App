import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  const { posts, deletePost } = useContext(PostContext);

  const [likes, setLikes] = useState({});
  const [activePost, setActivePost] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);

  const confirmDelete = () => {
    deletePost(deletePostId);
    setDeletePostId(null);
  };

  const toggleLike = (postId) => {
    setLikes((prev) => {
      const current = prev[postId] || 0;
      return {
        ...prev,
        [postId]: current === 1 ? 0 : 1
      };
    });
  };

  return (
    <div className="page">

      <h2 className="page-title">Posts</h2>

      {posts.length === 0 && <p>No posts yet</p>}

      <div className="post-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">

            <h3>{post.title}</h3>
             
             <div className="image-frame">
             {post.image_url ? (
              <img src={post.image_url} alt={post.title} />
                ) : (
             <div className="no-image">No Image</div>
              )}
            </div>

            <div className="post-actions">

              <button
                className="btn"
                onClick={() => setActivePost(post)}
              >
                <FaEye />
              </button>

              <Link to={`/edit/${post.id}`} className="btn">
                <FaEdit />
              </Link>

              <button
                className="btn delete"
                onClick={() => setDeletePostId(post.id)}
              >
                <FaTrash />
              </button>

            </div>
          </div>
        ))}
      </div>
    {activePost && (
         <div className="modal-overlay">

    <div className="modal-box">

      <button
        className="close-btn"
        onClick={()=>setActivePost(null)}
      >
        ✕
      </button>

      <h2>{activePost.title}</h2>

      {activePost.image_url && (
        <img
          src={activePost.image_url}
          className="modal-image"
        />
      )}

      <p>{activePost.description}</p>
      <p><b>Author:</b> {activePost.author?.name}</p>


    </div>

  </div>
)}

      {deletePostId && (
        <div className="modal">
          <div className="modal-card">

            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this post?</p>

            <div className="form-buttons">

              <button
                className="btn cancel"
                onClick={() => setDeletePostId(null)}
              >
                Cancel
              </button>

              <button
                className="btn delete"
                onClick={confirmDelete}
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}