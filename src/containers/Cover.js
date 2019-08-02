import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";


const Cover = function() {
  return (
    <div className="coverPage">
      <div><h1>OUR NAME</h1></div>
      
      <div className="buttonContainer">
        <Link to="/signup">
          <button style={styles.authbutton} className="btn btn-info">Sign Up</button>
        </Link>
        <Link to="login">
          <button style={styles.authbutton} className="btn btn-success">Log in</button>
        </Link>
      </div>
    </div>
  );
};

export default Cover;

const styles = {
  authbutton: {
    marginLeft: "5px",
    marginRight: "5px",
  }
}
