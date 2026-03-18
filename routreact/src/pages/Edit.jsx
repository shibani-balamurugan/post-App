import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import PostForm from "../components/PostForm";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, updatePost } = useContext(PostContext);

  const post = getPostById(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    authotName : "",
    image: null
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        description: post.description,
        authorName: post.author?.name || "",
        image:null,
        image_url:post.image_url
    
      });
    }
  }, [post]);

  const submit = () => {
    updatePost(post.id, formData.title, formData.description,formData.authorName,formData.image,formData.removeImage);
    navigate("/");
  };

  if (!post) return <p className="page-message">Post not found</p>;

  return (
    <div className="center-card">

      <h2 className="page-title">📝 Edit Post</h2>

      <div className="form-card">
        <PostForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={submit}
          buttonText="Update"
        />
      </div>
      

    </div>
  );
}