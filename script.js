
let wordsArray;
loadWords();

function loadWords() {
    fetch('words.txt')
        .then(response => response.text())
        .then(data => {
            // Split the content by new lines to get an array of words
            wordsArray = data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
            // Log the array to the console
            console.log(wordsArray);
        })
        .catch(error => console.error('Error fetching the file:', error));
}

function getBoard() {

}