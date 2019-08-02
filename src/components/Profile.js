import React, { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          console.log(responseJson.data);
          setProfile(responseJson.data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="profile">
      <h1>profile page woo</h1>
      <img src={profile.profilePic} />
      <h3>
        Name: {profile.firstName} {profile.lastName}
      </h3>
      <p>Age: {profile.age}</p>
      <p>Gender: {profile.gender}</p>
      <p>Bio: {profile.bio}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
}

export default Profile;
