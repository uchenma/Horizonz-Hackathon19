import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";


const Cover = function() {
  return (
    <div className="coverPage">
      <div>
        <h1 style={{textAlign:"center"}}>Pro-tip-z</h1>
        <p>Welcome to Pro-tip-z, a platform for support and love</p>
        </div>
      
      <div className="buttonContainer">
        <Link to="/signup">
          <button style={styles.authbutton} className="ghost-button">Sign Up</button>
        </Link>
        <Link to="login">
          <button style={styles.authbutton} className="ghost-button">Log in</button>
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
    width: "200px"
  }
}
