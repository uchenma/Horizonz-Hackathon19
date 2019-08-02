import React, { useState, useEffect } from "react";
import NewRec from "./NewRec";

function Timeline() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [newRec, setNewRec] = useState("");
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/timeline", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          console.log("responsejson data", responseJson.data);
          setGoals(responseJson.data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  function addNewGoal(e) {
    e.preventDefault();
    fetch("http://localhost:4000/newgoal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      redirect: "follow",
      body: JSON.stringify({
        content: newGoal
      })
    })
      .then(response => {
        return response.json;
      })
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.success) {
          setGoals(goals.push(responseJson.data));
          alert("Goal added!");
          setNewGoal("");
        }
      })
      .catch(err => console.log(err));
  }

  function addNewRec(e, goalId) {
    e.preventDefault();
    const link = "http://localhost:4000/:" + goalId + "/newrec";
    fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      redirect: "follow",
      body: JSON.stringify({
        content: newRec
      })
    })
      .then(response => {
        console.log(response);
        return response.json;
      })
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.success) {
          alert("Rec added!");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="timeline">
      <div>
        <h2 style={{ textAlign: "center" }}> All Goals</h2>
        <div className="form-group row offset-sm-1">
          <label className="col-sm-2 col-form-label">Set a new Goal! </label>
          <div className="col-sm-8">
            <textarea
              className="form-control"
              name="newGoal"
              value={newGoal}
              placeholder="Add my own goal"
              onChange={e => setNewGoal(e.target.value)}
              //   onKeyPress={e => addNewGoal(e)}
            />
          </div>
          <input
            className="btn btn-success col-sm-1"
            type="submit"
            value="Add"
            onClick={e => addNewGoal(e)}
          />
        </div>
        <ul>
          {goals.map(goal => {
            return (
              <div className="goalContainer" style={{ display: "flex", flexDirection: "row" }}>
                <div className="user" style={{ flex: 1, flexDirection: "column" }}>
                  {/* Div with user info */}
                  <img src={goal.user.profilePic} />
                  <p>Goal by user: {goal.user.firstName}</p>

                </div>
                <div style={{ flex: 2, flexDirection: "column" }}>
                  {/* Div with goal info */}
                  <h3>{goal.content}</h3>
                  <p>{goal.recs}</p>
                  <NewRec goalID={goal._id} />
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Timeline;
