import { createContext, useState, useEffect } from "react";
import {
  getPosts,
  createPost as createPostApi,
  updatePost as updatePostApi,
  deletePost as deletePostApi
} from "../services/postService";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const res = await getPosts();
    setPosts(res.data);
  };

  const createPost = async (title, description, authorName,image) => {
    const res = await createPostApi({ title, description, authorName,image});

    setPosts((prevPosts) => [...prevPosts, res.data]);
  };

  const deletePost = async (id) => {
    await deletePostApi(id);

    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== id)
    );
  };

  const updatePost = async (id, title, description, authorName,image,removeImage) => {
    const res = await updatePostApi(id, { title, description, authorName,image,removeImage});

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? res.data : post
      )
    );
  };

  const getPostById = (id) => {
    return posts.find((p) => p.id === Number(id));
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        createPost,
        deletePost,
        updatePost,
        getPostById
      }}
    >
      {children}
    </PostContext.Provider>
  );
}