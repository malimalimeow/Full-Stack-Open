import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const Blog = ({ blogs, handleUpdate, handleDelete, user, id: propId }) => {
  const [show, setShow] = useState(false);
  const id = useParams().id || propId;
  const navigate = useNavigate();
  if (blogs.length === 0) {
    return <div>Loading master data from backend... ⏳</div>;
  }
  const blog = blogs.find((b) => b.id === id);

  const toBlog = () => navigate("/");

  const addLike = (event) => {
    event.preventDefault();
    handleUpdate(blog.id, { ...blog, likes: blog.likes + 1 });
  };

  const removeBlog = (event) => {
    event.preventDefault();
    handleDelete(blog.id, blog.title, blog.author);
    toBlog();
  };
  const showLike = user && user.username;

  const showRemove = user?.username === blog?.user?.username;
  console.log(blog.user.username);

  return (
    <div data-testid="blogTest">
      <h1>{blog.title} </h1>
      <h3>by {blog.author}</h3>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Url</TableCell>
              <TableCell>Creator</TableCell>
              <TableCell>Like</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{blog.url}</TableCell>
              <TableCell>{blog.user.name}</TableCell>
              <TableCell>
                {blog.likes}
                {showLike ? (
                  <Button
                    sx={{ color: "#1a7e65", border: "1px solid #1a7e65" }}
                    onClick={addLike}
                  >
                    like
                  </Button>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {showRemove && (
        <Button
          sx={{ color: "#FA2A55", border: "1px solid #FA2A55" }}
          onClick={removeBlog}
        >
          Remove
        </Button>
      )}
    </div>
  );
};

export default Blog;
