import React, { useState } from "react";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => console.log("post /login response:", response));
  }

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChangeText={text => setEmail(text)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChangeText={text => setPassword(text)}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
