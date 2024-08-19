let testboard1 = [
  ["M", "I", "L", "S"],
  ["I", "D", "E", "A"],
  ["S", "E", "A", "M"],
  ["S", "A", "F", "E"],
];

let testboard2 = [
  ["S", "N", "O", "T"],
  ["H", "I", "R", "E"],
  ["I", "C", "E", "S"],
  ["V", "E", "S", "T"],
];

let testboard3 = [
  ["C", "H", "O", "W"],
  ["H", "A", "R", "E"],
  ["A", "R", "C", "S"],
  ["T", "E", "S", "T"],
];

let testboard4 = [
  ["B", "A", "R", "F"],
  ["A", "L", "O", "E"],
  ["W", "O", "O", "L"],
  ["L", "E", "F", "T"],
];

let testboards = [
  [
    ["M", "I", "L", "S"],
    ["I", "D", "E", "A"],
    ["S", "E", "A", "M"],
    ["S", "A", "F", "E"],
  ],
  [
    ["S", "N", "O", "T"],
    ["H", "I", "R", "E"],
    ["I", "C", "E", "S"],
    ["V", "E", "S", "T"],
  ],
  [
    ["C", "H", "O", "W"],
    ["H", "A", "R", "E"],
    ["A", "R", "C", "S"],
    ["T", "E", "S", "T"],
  ],
  [
    ["B", "A", "R", "F"],
    ["A", "L", "O", "E"],
    ["W", "O", "O", "L"],
    ["L", "E", "F", "T"],
  ],
];

let curBoardIndex = 0;
let board1 = testboards[curBoardIndex];
let highlighted = [];
let letterOrder = [];
let numIncorrect = 0;
let horizontal = true;
let previousClick;
createGrid();

function nextBoard() {
  curBoardIndex++;
  board1 = testboards[curBoardIndex % testboards.length];
  resetGame();
}

function resetGame() {
  deleteGrid();
  const winnertag = document.getElementById("winner");
  const numIncorrectOnScreen = document.getElementById("numIncorrect");
  numIncorrectOnScreen.innerHTML = "0";
  winnertag.innerHTML = "Good Luck!";
  winnertag.className = "";
  letterOrder = [];
  numIncorrect = 0;
  horizontal = true;
  createGrid();
}
function startLetters() {
  const inputLetters = document.getElementById("inputLetters");
  const letterArr = inputLetters.value.toUpperCase().split("");
  console.log(board1);
  console.log(letterOrder);
  for (let i = 0; i < board1.length; i++) {
    for (let j = 0; j < board1.length; j++) {
      if (letterArr.includes(board1[i][j])) {
        letterOrder[i][j].value = board1[i][j];
        letterOrder[i][j].classList.add("correct");
      }
    }
  }
}

function createGrid() {
  console.log(board1);
  const inputval = document.getElementById("gridsize");
  const grid = document.getElementById("grid");
  for (let i = 0; i < inputval.value; i++) {
    const rowdiv = document.createElement("div");
    rowdiv.classList.add("row");
    let temparr = [];
    for (let j = 0; j < inputval.value; j++) {
      const newdiv = document.createElement("div");
      newdiv.classList.add("grid");
      const newinput = document.createElement("input");
      newinput.classList.add("letter");
      newinput.type = "text";
      newinput.value = "";
      newinput.maxLength = "1";
      newinput.classList.add("R" + i);
      newinput.classList.add(j);
      newinput.addEventListener("click", onLetterClick);
      newinput.addEventListener("input", moveToNext);
      newinput.addEventListener("keydown", replaceExistingLetter);
      newdiv.appendChild(newinput);
      rowdiv.appendChild(newdiv);
      temparr.push(newinput);
    }
    letterOrder.push(temparr);
    grid.appendChild(rowdiv);
  }
  addVerticalOrder();
}

function addVerticalOrder() {
  //TODO dynamic grid size
  for (let i = 0; i < 4; i++) {
    let temparr = [];
    for (let j = 0; j < 4; j++) {
      temparr.push(letterOrder[j][i]);
    }
    letterOrder.push(temparr);
  }
}

function clearHighlights() {
  const templist = document.getElementsByClassName("blueHighlight");
  highlighted = [];
  for (let i = templist.length - 1; i >= 0; i--) {
    templist[i].classList.remove("blueHighlight");
  }
}

function replaceExistingLetter() {
  this.value = "";
  if (this.classList[3] != "blueHighlight") {
    this.classList.remove(this.classList[3]);
  }
}

function onLetterClick() {
  clearHighlights();
  if (this == previousClick) {
    horizontal = !horizontal;
  }
  setHighlights(this);
  previousClick = this;
}

function setHighlights(input) {
  if (horizontal) {
    const templist = document.getElementsByClassName(input.classList[1]);
    for (const tempdiv of templist) {
      tempdiv.classList.add("blueHighlight");
      highlighted.push(tempdiv);
    }
  } else {
    const templist = document.getElementsByClassName(input.classList[2]);
    for (const tempdiv of templist) {
      tempdiv.classList.add("blueHighlight");
      highlighted.push(tempdiv);
    }
  }
}

function moveToNextHighlights(input) {
  clearHighlights();
  setHighlights(input);
}

function moveToNext() {
  let indexr;
  let indexc;
  let lengthOfGrid = letterOrder[0].length;
  for (let i = 0; i < letterOrder.length; i++) {
    for (let j = 0; j < lengthOfGrid; j++) {
      if (this == letterOrder[i][j]) {
        indexr = i;
        indexc = j;
        i = letterOrder.length;
        break;
      }
    }
  }
  //checkword
  //check horizontal if horizontal and vertical if vertical then check next
  if (horizontal) {
    let count = indexc + 1;
    for (let i = 0; i < lengthOfGrid; i++) {
      const tempInput = letterOrder[indexr][count % lengthOfGrid];
      if (tempInput.value == "") {
        tempInput.focus();
        previousClick = tempInput;
        return;
      }
      count++;
    }
  } else {
    let count = indexr + 1;
    for (let i = 0; i < lengthOfGrid; i++) {
      const tempInput = letterOrder[count % lengthOfGrid][indexc];
      if (tempInput.value == "") {
        tempInput.focus();
        previousClick = tempInput;
        return;
      }
      count++;
    }
  }
  if (horizontal) {
    let count = 0;
    while (count < lengthOfGrid) {
      for (let i = 0; i < lengthOfGrid; i++) {
        const tempInput = letterOrder[(indexr + count + 1) % lengthOfGrid][i];
        if (tempInput.value == "") {
          tempInput.focus();
          moveToNextHighlights(tempInput);
          previousClick = tempInput;
          return;
        }
      }
      count++;
    }
  } else {
    let count = 0;
    while (count < lengthOfGrid) {
      for (let i = 0; i < lengthOfGrid; i++) {
        const tempInput = letterOrder[i][(indexc + count + 1) % lengthOfGrid];
        if (tempInput.value == "") {
          tempInput.focus();
          moveToNextHighlights(tempInput);
          previousClick = tempInput;
          return;
        }
      }
      count++;
    }
  }
}

function deleteGrid() {
  document.getElementById("grid").innerHTML = "";
}

function checkBoard() {
  const letters = document.getElementsByClassName("letter");
  const inboard = convertBoardtoCharArr(letters);
  let count = 0;
  for (let i = 0; i < inboard.length; i++) {
    for (let j = 0; j < inboard.length; j++) {
      const tempLetter = letters[i * 4 + j];
      if (inboard[i][j] == board1[i][j]) {
        removeTags(tempLetter);
        tempLetter.classList.add("correct");
        count++;
      }
    }
  }
  for (let i = 0; i < inboard.length; i++) {
    for (let j = 0; j < inboard.length; j++) {
      const tempLetter = letters[i * 4 + j];
      let className;
      if (tempLetter.classList[3] != "correct" && tempLetter.value != "") {
        const horizontalVal = checkHorizontal(inboard[i][j], i, letters);
        const verticalVal = checkVertical(inboard[i][j], j, letters);
        if (horizontalVal && verticalVal) {
          className = "wrongBothSpot";
        } else if (horizontalVal) {
          className = "wrongHorizontalSpot";
        } else if (verticalVal) {
          className = "wrongVerticalSpot";
        } else {
          className = "incorrect";
        }
        numIncorrect++;
        removeTags(tempLetter);
        tempLetter.classList.add(className);
      }
    }
  }
  document.getElementById("numIncorrect").innerHTML = numIncorrect;
  if (count == 16) {
    const winnerheader = document.getElementById("winner");
    winnerheader.innerHTML = "YOU WON!!!!";
    winnerheader.classList.add("correct");
  }
}

function removeTags(letter) {
  letter.classList.remove("blueHighlight");
  letter.classList.remove("correct");
  letter.classList.remove("wrongBothSpot");
  letter.classList.remove("wrongVerticalSpot");
  letter.classList.remove("wrongHorizontalSpot");
  letter.classList.remove("incorrect");
}

function checkHorizontal(letter, row, letters) {
  //count nubmer of letters that match ours
  let count = 0;
  for (let i = 0; i < board1[row].length; i++) {
    if (board1[row][i] == letter) {
      count++;
    }
  }
  for (let i = 0; i < board1[row].length; i++) {
    const input = letters[row * 4 + i];
    if (board1[row][i] == letter) {
      if (input.classList[3] == "correct") {
        count--;
      }
    }
    if (
      input.value.toUpperCase() == letter &&
      input.classList[3] == "wrongHorizontalSpot"
    ) {
      count--;
    }
  }
  return count > 0;
}

function checkVertical(letter, col, letters) {
  let count = 0;
  for (let i = 0; i < board1[col].length; i++) {
    if (board1[i][col] == letter) {
      count++;
    }
  }
  for (let i = 0; i < board1[col].length; i++) {
    const input = letters[i * 4 + col];
    if (board1[i][col] == letter) {
      if (input.classList[3] == "correct") {
        count--;
      }
    }
    if (
      input.value.toUpperCase() == letter &&
      input.classList[3] == "wrongVerticalSpot"
    ) {
      count--;
    }
  }
  return count > 0;
}

function convertBoardtoCharArr(letters) {
  const temparr = [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ];
  let count = 0;
  for (let i = 0; i < temparr.length; i++) {
    for (let j = 0; j < temparr.length; j++) {
      temparr[i][j] = letters[count].value.toUpperCase();
      count++;
    }
  }
  return temparr;
}

function loadWords() {
  console.log("loadwords");
  fetch("words4letLiked")
    .then((response) => response.text())
    .then((data) => {
      let wordsArray = data.split("\n").map((word) => word.trim());
      console.log(wordsArray);
      //getAllBoard4Let(wordsArray);
      getBoard(wordsArray);
    })
    .catch((error) => console.error("Error fetching the file:", error));
}

function getBoard(wordsArray) {
  let charArr = [
    ["a", "a", "a", "a"],
    ["a", "a", "a", "a"],
    ["a", "a", "a", "a"],
    ["a", "a", "a", "a"],
  ];
  let size = wordsArray.length;
  for (let i = 0; i < 10000000; i++) {
    charArr[0] = wordsArray[Math.floor(Math.random() * size)].split("");
    charArr[1] = wordsArray[Math.floor(Math.random() * size)].split("");
    charArr[2] = wordsArray[Math.floor(Math.random() * size)].split("");
    charArr[3] = wordsArray[Math.floor(Math.random() * size)].split("");
    if (i % 100000 == 0) {
      console.log(i);
    }
    if (isValidBoard(wordsArray, charArr)) {
      outputBoard(charArr);
    }
  }
}

function getBoard3(wordsArray) {
  let charArr = [
    ["a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a"],
  ];
  for (let i = 0; i < 100000000; i++) {
    charArr[0] = wordsArray[Math.floor(Math.random() * 5757)].split("");
    charArr[1] = wordsArray[Math.floor(Math.random() * 5757)].split("");
    charArr[2] = wordsArray[Math.floor(Math.random() * 5757)].split("");
    charArr[3] = wordsArray[Math.floor(Math.random() * 5757)].split("");
    charArr[4] = wordsArray[Math.floor(Math.random() * 5757)].split("");
    if (i % 100000 == 0) {
      console.log(i);
    }
    if (isValidBoard(wordsArray, charArr)) {
      print("WINNER");
      outputBoard(charArr);
      return;
    }
  }
}

function getAllBoard4Let(wordsArray) {
  let charArr = [
    ["a", "a", "a", "a"],
    ["a", "a", "a", "a"],
    ["a", "a", "a", "a"],
    ["a", "a", "a", "a"],
  ];
  let size = wordsArray.length;
  let count = 0;
  for (let i = 0; i < size; i++) {
    charArr[0] = wordsArray[i].split("");
    for (let j = 1; j < size; j++) {
      charArr[1] = wordsArray[j].split("");
      for (let k = 2; k < size; k++) {
        charArr[2] = wordsArray[k].split("");
        for (let ix = 3; ix < size; ix++) {
          charArr[3] = wordsArray[ix].split("");
          count++;
          if (count % 50000 == 0) {
            outputBoard(charArr);
          }
          if (isValidBoard(wordsArray, charArr)) {
            console.log(
              "WINNERNENRNE\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
            );
            outputBoard(charArr);
          }
        }
      }
    }
  }
}

function getBoard2(wordsArray) {
  let charArr = [
    ["a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a"],
  ];
  console.log("testboards");
  console.log(wordsArray);
  let count = 0;
  for (let i = 0; i < wordsArray.length; i++) {
    charArr[0] = wordsArray[i].split("");
    for (let j = 1; j < wordsArray.length; j++) {
      charArr[1] = wordsArray[j].split("");
      for (let k = 2; k < wordsArray.length; k++) {
        charArr[2] = wordsArray[k].split("");
        for (let ix = 3; ix < wordsArray.length; ix++) {
          charArr[3] = wordsArray[ix].split("");
          for (let jx = 4; jx < wordsArray.length; jx++) {
            charArr[4] = wordsArray[jx].split("");
            outputBoard(charArr);
            if (isValidBoard(wordsArray, charArr)) {
              count++;
              print(
                "i = " + i + " j = " + "k = " + k + "ix = " + ix + "jx = " + jx
              );
              outputBoard(charArr);
              return;
            }
          }
        }
      }
    }
  }
}

function outputBoard(charArr) {
  let tempword = "";
  for (let idx = 0; idx < charArr.length; idx++) {
    for (let jdx = 0; jdx < charArr.length; jdx++) {
      tempword += charArr[idx][jdx];
    }
    tempword += "\n";
  }
  console.log(tempword);
}

function isValidBoard(wordsArray, charArr) {
  for (let i = 0; i < charArr.length; i++) {
    let tempword = "";
    for (let j = 0; j < charArr.length; j++) {
      tempword += charArr[j][i];
    }
    if (!wordsArray.includes(tempword)) {
      return false;
    }
  }
  return true;
}
