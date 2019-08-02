import React, { useState } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  function login(e) {
    e.preventDefault();

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: email,
        password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("post /login response:", responseJson);
        if (responseJson.success) {
          setIsLogin(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  if (isLogin) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <div>
        <form onSubmit={e => login(e)}>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
