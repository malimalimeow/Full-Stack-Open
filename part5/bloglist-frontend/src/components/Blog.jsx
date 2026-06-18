import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Blog = ({ blogs, handleUpdate, handleDelete, user }) => {
  const [show, setShow] = useState(false);

  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);
  const navigate = useNavigate();
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
  const showLike = user !== "" ? true : false;

  const showRemove = user.username || "" === blog.user.username ? true : false;

  console.log(user);
  return (
    <div data-testid="blogTest">
      {blog.author}:{blog.title}
      <p>
        Like: {blog.likes}
        {showLike ? <button onClick={addLike}>like</button> : ""}
      </p>
      <p>Url: {blog.url}</p>
      <p>created by:{blog.user.name}</p>
      {showRemove && <button onClick={removeBlog}>Remove</button>}
    </div>
  );
};

export default Blog;
