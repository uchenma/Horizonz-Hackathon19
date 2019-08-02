import React, { useState } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  function handleGenderSelect(e) {
    e.preventDefault();
    setGender(e.target.value);
  }

  const signup = e => {
    e.preventDefault();

    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" //are these headers right
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        age,
        profilePic,
        gender,
        bio
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(" post /signup response", responseJson);
        if (responseJson.success) {
          setIsSignup(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (isSignup) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h3 style={{ textAlign: "center" }}>Register</h3>
        <form className="signupForm" onSubmit={e => signup(e)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                value={email}
                placeholder="email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Password</label>
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

          <div className="form-row">
            <div className="form-group col-md-6">
              <label> First Name</label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                value={firstName}
                placeholder="Enter your first name"
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label> Last Name</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={lastName}
                placeholder="Enter your last name"
                onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Age</label>
              <input
                className="form-control"
                type="number"
                name="age"
                value={age}
                placeholder="Enter your age"
                onChange={e => setAge(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Profile Picture </label>
              <input
                className="form-control"
                type="text"
                name="profilePic"
                value={profilePic}
                placeholder="Enter an image URL to display on your profile"
                onChange={e => setProfilePic(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Bio</label>
              <textarea
                className="form-control"
                name="bio"
                value={bio}
                placeholder="Type a short bio"
                onChange={e => setBio(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Gender </label>
              <div>
                <div className="form-check">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      className="form-check-input"
                      onChange={e => handleGenderSelect(e)}
                    />
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      className="form-check-input"
                      onChange={e => handleGenderSelect(e)}
                    />
                    Female
                  </label>
                </div>
                <div className="form-check">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={gender === "Other"}
                      className="form-check-input"
                      onChange={e => handleGenderSelect(e)}
                    />
                    Other
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              style={{ width: "20%" }}
              className="ghost-button"
              type="submit"
              value="Sign up!"
            />
            <Link to="/login" style={{ textAlign: "right" }}>
              Login Here!
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
