import { useState } from "react";
import loginService from "../services/loginService";
import blogService from "../services/blogService";

const Login = ({ tools }) => {
  const {
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
  } = tools;

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
    } catch (exception) {
      setMessage("wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Log in to application</h1>

      <form onSubmit={handleLogin}>
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

        <label>
          password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
