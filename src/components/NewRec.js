import React, { useState } from "react";

function NewRec(goalID) {
  const [newRec, setNewRec] = useState("");

  function addNewRec(e, goalID) {
    e.preventDefault();
    const link = "http://localhost:4000/" + goalID.goalID + "/newrec";
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
        return response.json();
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
    <div>
      <textarea
        name="newRec"
        value={newRec}
        placeholder="Make a recommendation!"
        onChange={e => {
          setNewRec(e.target.value);
        }}
      />
      <input type="submit" value="Add" onClick={e => addNewRec(e, goalID)} />
    </div>
  );
}

export default NewRec;
