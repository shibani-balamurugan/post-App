import { useState, useContext } from "react";
import { PostContext } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function Create()  {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    authorName : "",
    image :null
  });

  const { createPost } = useContext(PostContext);
  const navigate = useNavigate();

  const submit = () => {
    createPost(formData.title, formData.description,formData.authorName,formData.image);
    navigate("/");
  };

  return (
   
  <div className="center-card">

    <h2>Create Post</h2>

    <PostForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={submit}
      buttonText="Create"
    />
  

   

  </div>
);
 
}