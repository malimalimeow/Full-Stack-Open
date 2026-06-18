import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import blogService from "./services/blogService";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import "./app.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(true);
  const [login, setLogin] = useState(false);

  const handleCreate = async (object) => {
    try {
      const response = await blogService.create(object);
      return setBlogs(blogs.concat(response));
    } catch (exception) {
      const errorMessage =
        exception.response?.data?.error || "something went wrong";
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
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
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
          {message !== null && <Notification tools={notiTools} />}
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>log out</button>
          </p>

          <Togglable buttonLabel="Create Blog">
            <CreateBlog tools={createTools} />
          </Togglable>
          <br />

          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                user={user}
              />
            ))}
        </div>
      ) : (
        <Login tools={loginTools} />
      )}
    </>
  );
};

export default App;
