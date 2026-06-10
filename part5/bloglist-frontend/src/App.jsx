import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import blogService from "./services/blogService";
import "./app.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(true);
  const [login, setLogin] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogLink, setBlogLink] = useState("");

  const createTools = {
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
  };

  const loginTools = {
    user,
    setUser,
    username,
    setUsername,
    password,
    setPassword,
    message,
    setMessage,
    login,
    setLogin,
    isError,
    setIsError,
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setLogin(true);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    setUser("");
    setLogin(false);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  return (
    <>
      {login ? (
        <div>
          <h1>Blogs</h1>
          {message !== null && (
            <p className={`messageTheme  ${isError ? "error" : "success"}`}>
              {message}
            </p>
          )}
          <p>
            {user.name} logged in{" "}
            <button onClick={handleLogout}>log out</button>
          </p>

          <CreateBlog tools={createTools} />
          <br />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <Login tools={loginTools} />
      )}
    </>
  );
};

export default App;
