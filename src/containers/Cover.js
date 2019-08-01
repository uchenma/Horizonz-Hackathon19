import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from '../components/Login'
import Signup from '../components/Signup'

const Cover = function() {
  return (
    <div className="coverPage">
      <h1>OUR NAME</h1>
      <Route path='/signup'component={Signup}/>
      <Route path='/login'component={Login}/>
      <div className="buttonContainer">
        <Link to="/signup">
          <button className="button buttonBlue">Sign Up</button>
        </Link>
        <Link to="login">
          <button className="button buttonGreen">Log in</button>
        </Link>
      </div>
    </div>
  );
};

export default Cover;
