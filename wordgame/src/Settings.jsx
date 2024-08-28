import { useState } from "react";

function Settings() {
  const [newGridSize, setNewGridSize] = useState("4");

  return (
    <div className="Settings">
      <input
        value={newGridSize}
        onChange={(e) => setNewGridSize(e.target.value)}
        type="number"
        id="gridsize"
      />
      <p>The gridsize is: {newGridSize}</p>
      <br></br>
      <button onclick="loadWords()">Find Boards</button>
      <button onclick="nextBoard()">Next Board</button>
      <br></br>
    </div>
  );
}

export default Settings;
