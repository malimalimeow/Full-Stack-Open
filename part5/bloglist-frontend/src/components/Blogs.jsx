import React from "react";
import Blog from "./Blog";
import { Link } from "react-router-dom";

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
                {blog.author}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Blogs;
