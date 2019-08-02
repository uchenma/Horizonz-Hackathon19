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
        <h3 style={{textAlign:"center"}}>Login</h3>
        <form onSubmit={e => login(e)}>
        <div class="form-group row">
          <label className="col-sm-2 col-form-label">Email </label>
          <div className="col-sm-10">
          <input
          className="form-control"
            type="text"
            name="email"
            value={email}
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
          />
          </div>
        </div>
        <div class="form-group row">
          <label className="col-sm-2 col-form-label">Password </label>
          <div className="col-sm-10">
          <input
          className="form-control"
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
          />
          </div>
        </div>
          
          
          <input className="btn btn-success" type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
