function Board() {
  return (
    <div className="Board">
      <br></br>
      <button onclick="createGrid()">Create Grid</button>
      <br></br>
      <input id="inputLetters" type="text" value="RLSTNE" maxlength="10" />
      <button>Start Letters</button>
      <p>Board</p>
    </div>
  );
}

export default Board;
