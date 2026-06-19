import { useState } from "react";
import loginService from "../services/loginService";
import blogService from "../services/blogService";
import Notification from "./Notification";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ tools }) => {
  const { setUser, message, setMessage, setLogin, isError, setIsError } = tools;

  const notiTools = { message, isError, setMessage };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toBlog = () => navigate("/");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.authorize({
        username: username,
        password: password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setLogin(true);
      toBlog();
    } catch (exception) {
      const errorMessage =
        exception.response?.data?.error || "something went wrong";
      setIsError(true);
      setMessage(`Failed to login because ${errorMessage}`);
    }
  };

  return (
    <>
      <h1>Log in to application</h1>
      {message !== null && <Notification tools={notiTools} />}
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;
