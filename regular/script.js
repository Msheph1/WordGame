


function loadWords() {
    console.log('loadwords');
    fetch('words4letLiked')
        .then(response => response.text())
        .then(data => {
            // Split the content by new lines to get an array of words
            let wordsArray = data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
            // Log the array to the console
            console.log(wordsArray);
            //getAllBoard4Let(wordsArray);
            getBoard(wordsArray);
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
    