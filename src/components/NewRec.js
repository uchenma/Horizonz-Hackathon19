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
          setNewRec("")
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <div>
      <div class="form-group row">
        <div className="col-sm-8">
          <textarea
            className="form-control"
            name="newRec"
            value={newRec}
            placeholder="Make a recommendation!"
            onChange={e => {
              setNewRec(e.target.value);
            }}
          />
        </div>

        <input
          className="btn btn-success col-sm-2"
          type="submit"
          value="Add"
          onClick={e => addNewRec(e, goalID)}
        />
      </div>
    </div>
  );
}

export default NewRec;
