import { useState } from "react";
import blogService from "../services/blogService";

const CreateBlog = ({ tools }) => {
  const {
    title,
    setTitle,
    author,
    setAuthor,
    blogLink,
    setBlogLink,
    message,
    setMessage,
    blogs,
    setBlogs,
    isError,
    setIsError,
  } = tools;

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.create({
        title: title,
        author: author,
        url: blogLink,
      });
      setIsError(false);
      setMessage(`A new blog ${title} by ${author} added`);
      setBlogs(blogs.concat(response));
      setTimeout(() => {
        setMessage(null);
        setTitle("");
        setAuthor("");
        setBlogLink("");
      }, 5000);
    } catch (exception) {
      const errorMessage =
        exception.response?.data?.error || "something went wrong";
      setMessage(`Failed to create blog because ${errorMessage}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            Title:
            <input
              required
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              required
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Url:
            <input
              required
              type="text"
              value={blogLink}
              onChange={(e) => setBlogLink(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </>
  );
};
export default CreateBlog;
