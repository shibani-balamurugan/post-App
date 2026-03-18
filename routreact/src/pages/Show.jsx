import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export default function Show() {
  const { id } = useParams();
  const { getPostById } = useContext(PostContext);

  const post = getPostById(id);z

  if (!post) return <p className="page-message">Post not found</p>;

  return (
    <div className="page">

      <div className="post-view">

        <h2>{post.title}</h2>

        <p className="post-content">{post.description}</p>

        <Link to="/">
          <button className="btn back">⬅ Back</button>
        </Link>

      </div>

    </div>
  );
}