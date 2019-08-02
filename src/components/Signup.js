import React, { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");

  const signup = () => {
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" //are these headers right
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(response => console.log(" post /signup response", response));
  };

  return (
    <div>
      <form onSubmit={signup}>
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
        <input
          type="text"
          name="firstName"
          value={firstName}
          placeholder="Enter your first name"
          onChangeText={text => setFirstName(text)}
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          placeholder="Enter your last name"
          onChangeText={text => setLastName(text)}
        />
        <input
          type="text"
          name="age"
          value={age}
          placeholder="Enter your age"
          onChangeText={text => setAge(text)}
        />
        <input
          type="text"
          name="profilePic"
          value={profilePic}
          placeholder="Enter an image URL to display on your profile"
          onChangeText={text => setProfilePic(text)}
        />
        <textarea
          name="bio"
          value={bio}
          placeholder="Type a short bio"
          onChangeText={text => setBio(text)}
        />
        {/* <div className="form-check">
          <label>
            <input
              type="radio"
              name="maleGender"
              value="Male"
              checked={false}
              className="form-check-input"
            />
            Male
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="femaleGender"
              value="Female"
              checked={false}
              className="form-check-input"
            />
            Female
          </label>
        </div>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="otherGender"
              value="Other"
              checked={false}
              className="form-check-input"
            />
            Other
          </label>
        </div> */}
        <input type="submit" value="Sign up!" />
      </form>
    </div>
  );
}

export default Signup;
