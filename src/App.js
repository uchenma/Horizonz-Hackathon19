import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Cover from "./containers/Cover";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./containers/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Route path="/signup" exact={true} component={Signup} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/" exact={true} component={Cover} />
      <Route path="/dashboard" exact={true} component={Dashboard} />
    </BrowserRouter>
  );
}

export default App;
