import axios from "axios";

const API_URL = "http://127.0.0.1:3000/api/v1/posts";

export const getPosts = () => {
  return axios.get(API_URL);
};

export const createPost = (post) => {
  const formData = new FormData();

  formData.append("post[title]", post.title);
  formData.append("post[description]", post.description);
  formData.append("post[author][name]", post.authorName);

  if (post.image) {
    formData.append("post[image]", post.image);
  }

  return axios.post(API_URL, formData);
};
export const updatePost = (id, post) => {
  const formData = new FormData();

  formData.append("post[title]", post.title);
  formData.append("post[description]", post.description);
  formData.append("post[author][name]", post.authorName);

  if (post.image) {
    formData.append("post[image]", post.image);
  }
  if (post.removeImage) {
    formData.append("remove_image", "true");
  }

  return axios.put(`${API_URL}/${id}`, formData);
};


export const deletePost = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};