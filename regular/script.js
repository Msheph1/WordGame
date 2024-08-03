let board1 = [['M','I','L','S'],['I','D','E','A'],['S','E','A','M'],['S','A','F','E']]
let highlighted = [];
let letterOrder = []
let horizontal = true;
let previousClick;
createGrid();

function createGrid() {
    deleteGrid();
    horizontal = true;
    const inputval = document.getElementById("gridsize");
    const grid = document.getElementById("grid");
    for(let i = 0; i < inputval.value; i++)
    {
        const rowdiv = document.createElement("div");
        rowdiv.classList.add("row");
        let temparr = []
        for(let j = 0; j < inputval.value; j++)
        {
            const newdiv = document.createElement("div");
            newdiv.classList.add("grid");
            const newinput = document.createElement("input");
            newinput.classList.add("letter");
            newinput.type = "text";
            newinput.value = "";
            newinput.maxLength = "1";
            newinput.classList.add('R' + i);
            newinput.classList.add(j);
            newinput.addEventListener("click", onLetterClick);
            newinput.addEventListener("keyup", moveToNext)
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
    console.log(letterOrder);
    for(let i = 0; i < 4; i++)
    {
        let temparr = [];
        for(let j = 0; j < 4; j++) {

            temparr.push(letterOrder[j][i]);
        }
        letterOrder.push(temparr);
    }
}

function clearHighlights()
{
    const templist = document.getElementsByClassName("blueHighlight");
    highlighted = [];
    for(let i = templist.length - 1; i >= 0; i--)
    {
        templist[i].classList.remove("blueHighlight");
    }
}

function onLetterClick() {
    clearHighlights();
    if(this == previousClick) {
        horizontal = !horizontal;
    }
    if(horizontal) {
        const templist = document.getElementsByClassName(this.classList[1]);
        for(const tempdiv of templist)
        {
            tempdiv.classList.add("blueHighlight");
            highlighted.push(tempdiv);
        }
    } else {
        const templist = document.getElementsByClassName(this.classList[2]);
        for(const tempdiv of templist)
        {
            tempdiv.classList.add("blueHighlight");
            highlighted.push(tempdiv);
        }
    }
    previousClick = this;
}

function moveToNext() {
    let indexr = -1;
    let indexc;
    for(let i = 0; i < letterOrder.length; i++)
    {
        for(let j = 0; j < letterOrder[0].length; j++) {
            if(this == letterOrder[i][j])
            {
                indexr = i;
                indexc = j;
                i = letterOrder.length;
                break;
            }
        }
    }
    //checkword 
    //check horizontal if horizontal and vertical if vertical then check next
    if(horizontal) {
        console.log('horizontal ran');
        let count = indexc + 1;
        for(let i = 0; i < letterOrder[0].length; i++) {
            if(letterOrder[indexr][count % letterOrder[0].length].value == "") {
                letterOrder[indexr][count % letterOrder[0].length].focus();
            }
        }
    } else {
        console.log('vertical ran');
        let count = indexr + 1;
        for(let i = 0; i < letterOrder[0].length; i++) {
            if(letterOrder[count % letterOrder[0].length][indexc].value == "") {
                letterOrder[count % letterOrder[0].length][indexc].focus();
            }
        }
    }
    for(let i = 0; i < indexc; i++)
        {
            for(let j = 0; j < letterOrder[0].length; j++) {
                if(letterOrder[i][j].value == "") {
                    console.log('focusbefore');
                    letterOrder[i][j].focus();
                }
            }
        }
}




function deleteGrid() {
    document.getElementById("grid").innerHTML = "";
}

function checkBoard() {
    const letters = document.getElementsByClassName("letter");
    const inboard = convertBoardtoCharArr(letters);

    for(let i = 0; i< inboard.length; i++) {
        for(let j = 0; j< inboard.length; j++) {
            const tempLetter = letters[i * 4 + j];
            if(inboard[i][j] == board1[i][j]) {
                removeTags(tempLetter)
                tempLetter.classList.add("correct");
            } else if(checkHorizontal() && checkVertical()) {
                removeTags(tempLetter);
                tempLetter.classList.add("wrongBothSpot");
            }
        }
    }
}

function removeTags(letter)
{
    letter.classList.remove("correct");
    letter.classList.remove("wrongBothSpot");
    letter.classList.remove("wrongVerticalSpot");
    letter.classList.remove("wrongHorizontalSpot");
}

function checkHorizontal(inboard) {

}

function checkVertical(inboard) {
}

function convertBoardtoCharArr(letters){
    const temparr = [['','','',''],['','','',''],['','','',''],['','','','']];
    let count = 0;
    for(let i = 0; i < temparr.length; i++)
    {
        for(let j =0; j < temparr.length; j++)
        {
            temparr[i][j] = letters[count].value.toUpperCase();
            count++;
        }
    }
    return temparr;
}



function loadWords() {
    console.log('loadwords');
    fetch('words4letLiked')
        .then(response => response.text())
        .then(data => {
            let wordsArray = data.split('\n').map(word => word.trim())
            console.log(wordsArray);
            //getAllBoard4Let(wordsArray);
           //getBoard(wordsArray);
        })
        .catch(error => console.error('Error fetching the file:', error));

}



function getBoard(wordsArray){
    let charArr = [['a','a','a','a'],['a','a','a','a'],['a','a','a','a'],['a','a','a','a']];
    let size = wordsArray.length;
    for(let i = 0; i < 10000000; i++)
    {
        charArr[0] = wordsArray[Math.floor(Math.random() * size)].split('');
        charArr[1] = wordsArray[Math.floor(Math.random() * size)].split('');
        charArr[2] = wordsArray[Math.floor(Math.random() * size)].split('');
        charArr[3] = wordsArray[Math.floor(Math.random() * size)].split('');
    if(i % 100000 == 0)
    {
        console.log(i);
    }
    if(isValidBoard(wordsArray, charArr))
        {
            outputBoard(charArr);
        }
    }
}




function getBoard3(wordsArray){
    let charArr = [['a','a','a','a','a'],['a','a','a','a','a'],['a','a','a','a','a'],['a','a','a','a','a'],['a','a','a','a','a']];
    for(let i = 0; i < 100000000; i++)
    {
        charArr[0] = wordsArray[Math.floor(Math.random() * 5757)].split('');
        charArr[1] = wordsArray[Math.floor(Math.random() * 5757)].split('');
        charArr[2] = wordsArray[Math.floor(Math.random() * 5757)].split('');
        charArr[3] = wordsArray[Math.floor(Math.random() * 5757)].split('');
        charArr[4] = wordsArray[Math.floor(Math.random() * 5757)].split('');
    if(i % 100000 == 0)
    {
        console.log(i);
    }
    if(isValidBoard(wordsArray, charArr))
        {
            print("WINNER");
            outputBoard(charArr);
            return;
        }
    }
}

function getAllBoard4Let(wordsArray) {
    let charArr = [['a','a','a','a'],['a','a','a','a'],['a','a','a','a'],['a','a','a','a']];
    let size = wordsArray.length;
    let count = 0;
    for(let i = 0; i < size; i++){
        charArr[0] = wordsArray[i].split('');
        for(let j = 1; j < size; j++){
            charArr[1] = wordsArray[j].split('');
            for(let k = 2; k < size; k++){
                charArr[2] = wordsArray[k].split('');
                for(let ix = 3; ix < size; ix++){
                    charArr[3] = wordsArray[ix].split('');
                    count++;
                    if(count % 50000 == 0)
                    {
                        outputBoard(charArr);
                    }
                    if(isValidBoard(wordsArray, charArr)){
                        console.log("WINNERNENRNE\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
                        outputBoard(charArr)
                    }
                }
            }
        }
    }
}


function getBoard2(wordsArray) {
    let charArr = [['a','a','a','a','a'],['a','a','a','a','a'],['a','a','a','a','a'],['a','a','a','a','a'],['a','a','a','a','a']];
    console.log('testboards');
    console.log(wordsArray);
    let count = 0;
    for(let i = 0; i < wordsArray.length; i++){
        charArr[0] = wordsArray[i].split('');
        for(let j = 1; j < wordsArray.length; j++){
            charArr[1] = wordsArray[j].split('');
            for(let k = 2; k < wordsArray.length; k++){
                charArr[2] = wordsArray[k].split('');
                for(let ix = 3; ix < wordsArray.length; ix++){
                    charArr[3] = wordsArray[ix].split('');
                    for(let jx = 4; jx < wordsArray.length; jx++){
                        charArr[4] = wordsArray[jx].split('');
                        outputBoard(charArr)
                        if(isValidBoard(wordsArray, charArr))
                        {
                            count++;
                            print('i = '+ i + ' j = ' + 'k = ' + k + 'ix = ' + ix + 'jx = ' + jx);
                            outputBoard(charArr)
                            return;
                        }
                    }
                }
            }
        }
    }
}


function outputBoard(charArr)
{
    let tempword = "";
    for(let idx = 0; idx < charArr.length; idx++)
        {
            for(let jdx = 0; jdx < charArr.length; jdx++)
            {
                tempword += charArr[idx][jdx];
            }
            tempword += "\n"
        }
        console.log(tempword);
}


function isValidBoard(wordsArray,charArr)
{
    for(let i = 0; i< charArr.length; i++)    
    {
        let tempword = ""
        for(let j = 0; j < charArr.length; j++)
        {
            tempword += charArr[j][i];
        }
        if(!wordsArray.includes(tempword))
        {
            return false;
        }
    }
    return true;
}
    