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

  if (openMessage) {
    return <Messages userId={userId} recId={recId} />;
  } else {
    return (
      <div className="timeline">
        <div>
          <h2 style={{ textAlign: "center" }}> All Goals!</h2>
          <div className="form-group row offset-sm-1">
            <h5 style={{alignItems:"center"}}className="col-sm-3">Set a new Goal! </h5>
            <div className="col-sm-7">
              <input
                className="form-control"
                name="newGoal"
                value={newGoal}
                placeholder="Add my own goal"
                onChange={e => setNewGoal(e.target.value)}
                //   onKeyPress={e => addNewGoal(e)}
              />
            </div>
            <input
              className="ghost-button col-sm-1"
              type="submit"
              value="Add"
              onClick={e => addNewGoal(e)}
            />
          </div>
          <div>
            {goals.map(goal => {
              return (
                <div className="goalContainer">
                  <div className="user">
                    {/* Div with user info */}
                    <img src={goal.user.profilePic} alt="profile pic" />
                    <h5>anonymousDolphin</h5>
                    <h5>Age: {goal.user.age}</h5>
                    <h5>Bio: {goal.user.bio}</h5>
                  </div>
                  <div className="allGoals">
                    <h2 className="goal">{goal.content}</h2>
                    <h4><strong>Recommendations:</strong></h4>
                    {goal.rec.map(rec => (
                      <div>
                        <div className="form-group row">
                        <h5 className="col-sm-9">
                          anonymousGoose recommended: {rec.content}
                        </h5>
                        <button
                          className="ghost-button col-sm-2"
                          onClick={e => {
                            e.preventDefault();
                            setOpenMessage(true);
                            setUserId(goal.user._id);
                            setRecId(rec.user);
                          }}
                        >
                          Resoond!
                        </button>
                        </div>
                        
                      </div>
                    ))}
                    <NewRec goalID={goal._id} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
