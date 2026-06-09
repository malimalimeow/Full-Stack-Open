import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogService";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [login, setLogin] = useState(false);

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
    <div>
      {message !== "" && <p>{message}</p>}
      {login ? (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in{" "}
            <button onClick={handleLogout}>log out</button>
          </p>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <Login tools={loginTools} />
      )}
    </div>
  );
};

export default App;
