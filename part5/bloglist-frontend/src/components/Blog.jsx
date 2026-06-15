import { useState } from "react";
const Blog = ({ blog, handleUpdate, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [show, setShow] = useState(false);

  const buttonWord = show ? "hide" : "show";

  const addLike = (event) => {
    event.preventDefault();
    handleUpdate(blog.id, { ...blog, likes: blog.likes + 1 });
  };

  const removeBlog = (event) => {
    event.preventDefault();
    handleDelete(blog.id, blog.title, blog.author);
  };

  return (
    <div style={blogStyle}>
      {blog.title}-{blog.author}
      <button onClick={() => setShow(!show)}>{buttonWord}</button>
      {show ? (
        <>
          <p>
            Like: {blog.likes}
            <button onClick={addLike}>like</button>
          </p>
          <p>Url: {blog.url}</p>
          <p>created by:{blog.user.name}</p>
          <button onClick={removeBlog}>Remove</button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Blog;
