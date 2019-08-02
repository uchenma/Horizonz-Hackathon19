import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import NewRec from "./NewRec";
import Messages from "./Messages"; 

function Timeline() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  const [recId, setRecId] = useState("");
  const [userId, setUserId] = useState("");

  console.log('Timeline', userId, recId)

  
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
          alert("Goal added!");
          setNewGoal("");
        }
      })
      .catch(err => console.log(err));
  }

if(openMessage){
 return <Messages userId={userId} recId={recId}/> 
} else{

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
              <div
                className="goalContainer"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div
                  className="user"
                  style={{ flex: 1, flexDirection: "column" }}
                >
                  {/* Div with user info */}
                  <img src={goal.user.profilePic} alt="profile pic" />
                  <p>Goal by user: {goal.user.firstName}</p>
                </div>
                <div style={{ flex: 2, flexDirection: "column" }}>
                  {/* Div with goal info */}
                  <h3>{goal.content}</h3>
                  {console.log("goal", goal)}
                  {console.log("rec array", goal.rec)}
                  <h4>Recommendations</h4>
                  {goal.rec.map(rec => (
                    <div>
                      <p>
                        {rec.user._id} recommended: {rec.content}
                      </p>
                      <button
                        onClick={e => {
                          e.preventDefault();
                          // return <Messages userId={goal.user._id} recId={rec.user}/>;
                          console.log('i clicked');
                          setOpenMessage(true);
                          setUserId(goal.user._id); 
                          setRecId(rec.user); 
                        }}
                      >
                        {" "}
                        Message them!
                      </button>
                    </div>
                  ))}
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
  
}

export default Timeline;
