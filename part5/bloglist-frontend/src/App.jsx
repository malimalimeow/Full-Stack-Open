import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import blogService from "./services/blogService";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import "./app.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(true);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const toBlog = () => navigate("/");

  const handleCreate = async (object) => {
    try {
      const response = await blogService.create(object);
      return setBlogs(blogs.concat(response));
    } catch (exception) {
      const errorMessage =
        exception.response?.data?.error || "something went wrong";
      setIsError(true);
      setMessage(`Failed to create blog because ${errorMessage}`);
    }
  };

  const handleUpdate = async (id, object) => {
    try {
      const response = await blogService.update(id, object);
      return setBlogs((prev) => prev.map((p) => (p.id === id ? response : p)));
    } catch (exception) {
      const errorMessage =
        exception.response?.data?.error || "something went wrong";
      setIsError(true);
      setMessage(`Failed to like because ${errorMessage}`);
    }
  };

  const handleDelete = async (id, title, author) => {
    if (!window.confirm(`Remove Blog ${title} by ${author}?`)) {
      return;
    }
    try {
      await blogService.remove(id);
      setIsError(false);
      setMessage("Blog deleted");
      setBlogs((prev) => prev.filter((p) => p.id !== id));
    } catch (exception) {
      const errorMessage =
        exception.response?.data?.error || "something went wrong";
      setIsError(true);
      setMessage(`Failed to delete because ${errorMessage}`);
    }
  };

  const notiTools = { message, isError, setMessage, setIsError };

  const createTools = {
    setMessage,
    setIsError,
    handleCreate,
  };

  const loginTools = {
    setUser,
    message,
    setMessage,
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
    console.log("bye");
    setUser("");
    setLogin(false);
    setMessage(null);
    setIsError(true);
    window.localStorage.removeItem("loggedBlogAppUser");
    toBlog();
  };

  const padding = {
    padding: 5,
  };

  return (
    <>
      <div>
        <Link style={padding} to="/">
          Blogs
        </Link>
        {login ? (
          <Link style={padding} to="/create">
            New Blog
          </Link>
        ) : (
          ""
        )}
        {login ? (
          <button onClick={() => handleLogout()}>Log out</button>
        ) : (
          <Link style={padding} to="/login">
            Log in
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Blogs blogs={blogs} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={blogs}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              user={user}
            />
          }
        />

        <Route path="/login" element={<Login tools={loginTools} />} />

        <Route path="/create" element={<CreateBlog tools={createTools} />} />
      </Routes>
    </>
  );
};

export default App;
