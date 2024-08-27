function Settings() {
  return (
    <div className="Settings">
      <input type="number" value="4" id="gridsize" />
      <button onclick="createGrid()">Create Grid</button>
      <br></br>
      <button onclick="loadWords()">Find Boards</button>
      <button onclick="nextBoard()">Next Board</button>
      <br></br>
      <input id="inputLetters" type="text" value="RLSTNE" maxlength="10" />
      <button>Start Letters</button>
    </div>
  );
}

export default Settings;
