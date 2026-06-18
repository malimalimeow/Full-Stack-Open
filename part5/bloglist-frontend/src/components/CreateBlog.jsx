import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = ({ tools }) => {
  const { setMessage, setIsError, handleCreate } = tools;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogLink, setBlogLink] = useState("");
  const navigate = useNavigate();
  const toBlog = () => navigate("/");

  const CreateBlog = (event) => {
    event.preventDefault();
    handleCreate({
      title: title,
      author: author,
      url: blogLink,
    });
    setIsError(false);
    setMessage(`A new blog ${title} by ${author} added`);
    setTitle("");
    setAuthor("");
    setBlogLink("");
    toBlog();
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={CreateBlog}>
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
