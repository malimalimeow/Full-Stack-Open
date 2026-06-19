import { TextField, Button } from "@mui/material";
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
          <TextField
            label="Title:"
            required
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br />
        <div>
          <TextField
            label="Author:"
            required
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <br />
        <div>
          <TextField
            label="Url:"
            required
            type="text"
            value={blogLink}
            onChange={(e) => setBlogLink(e.target.value)}
          />
        </div>
        <br />
        <Button
          sx={{ color: "#1b52ab", border: "1px solid #1b52ab" }}
          type="submit"
        >
          Create Blog
        </Button>
      </form>
    </>
  );
};
export default CreateBlog;
