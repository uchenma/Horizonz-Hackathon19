import React, { useState, useEffect } from "react";

function Timeline() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/timeline", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        setGoals(responseJson.goals);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="timeline">
      <h2> All Goals</h2>
    </div>
  );
}

export default Timeline;
