'use strict'

let memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let memory_values = [];
let memory_card_ids = [];
let card_flipped = 0;
let start = document.getElementById("startGame");
let pairs = document.getElementById("pairs");
let highScore = document.getElementById("high-score")
highScore.innerHTML = 9
let yourScore = 0;
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let totalSec = 0;
let timer;
let pairsFound = 0;

//all cards shuffle
Array.prototype.memory_card_shuffle = function () {
    let i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

//time format
function formatTime(val) {
    let value = val + '';
    if (value.length < 2) {
        return '0' + value;
    } else {
        return value;
    }
}

//time set
function setTime() {
    ++totalSec;
    min.innerHTML = formatTime(parseInt(totalSec / 60));
    sec.innerHTML = formatTime(totalSec % 60);
}

//display memory board initially
function initialBoard() {
    card_flipped = 0;
    let output = '';
    memory_array.memory_card_shuffle();
    for (let i = 0; i < memory_array.length; i++) {
        output += '<div id="card' + i + '" "></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
}

//on click of start game actual board display and on each card on click action perform to see value of card
function memoryBoard() {
    card_flipped = 0;
    let output = '';
    memory_array.memory_card_shuffle();
    for (let i = 0; i < memory_array.length; i++) {
        output += '<div id="card' + i + '" onclick="flipOnClick(this,\'' + memory_array[i] + '\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
    timer = setInterval(setTime, 1000);
}

//stop game functionality
function stop() {
    start.innerHTML = "Start Game";
    initialBoard();
    memory_values = [];
    memory_card_ids = [];
    pairsFound = 0;
    pairs.innerHTML = pairsFound;
    clearInterval(timer);
    totalSec = 0;
    min.innerHTML = '00';
    sec.innerHTML = '00';
}

//onclick of start game button, game start and we can also stop game if we want
function startGame() {
    if (start.innerHTML == 'Stop Game') {
        stop();
    } else {
        start.innerHTML = "Stop Game";
        memoryBoard();
    }
}

//on click on each card, it check whether it is matched with other card or not
function flipOnClick(card, val) {
    if (card.innerHTML == "" && memory_values.length < 2) {
        card.style.background = '#FFF';
        card.innerHTML = val;
        if (memory_values.length == 0) {
            memory_values.push(val);
            memory_card_ids.push(card.id);
        } else if (memory_values.length == 1) {
            memory_values.push(val);
            memory_card_ids.push(card.id);
            if (memory_values[0] == memory_values[1]) {
                card_flipped += 2;
                pairsFound += 1;
                pairs.innerHTML = pairsFound;
                // clear both arrays
                memory_values = [];
                memory_card_ids = [];
                if (card_flipped == memory_array.length) {
                    showWinScreen();
                }
            } else {
                function flipToBack() {
                    // flip the cards back 
                    let card_1 = document.getElementById(memory_card_ids[0]);
                    let card_2 = document.getElementById(memory_card_ids[1]);
                    card_1.style.backgroundColor = '#BF42D5';
                    card_1.innerHTML = "";
                    card_2.style.backgroundColor = '#BF42D5';
                    card_2.innerHTML = "";
                    // clear both arrays
                    memory_values = [];
                    memory_card_ids = [];
                }
                setTimeout(flipToBack, 700);
            }
        }
    }
}

//user score update with time
function updateScore() {
    if (min.innerHTML == '01') {
        yourScore = 7;
    } else if (sec.innerHTML <= '30') {
        yourScore = 15;
    } else if (sec.innerHTML <= '45') {
        yourScore = 12;
    } else if (sec.innerHTML <= '59') {
        yourScore = 8;
    } else {
        yourScore = 5;
    }
}

//user win game and check if user beat high score or not and ask user if they want to play again or not
function showWinScreen() {
    let textScore = '';
    updateScore();
    if (yourScore > highScore.innerHTML) {
        highScore.innerHTML = yourScore
        textScore = 'Congratulations! You beat high score: ' + highScore.innerHTML;
    } else {
        textScore = 'Your score: ' + yourScore;
    }


    if (confirm("You win!\nAll matching pairs found.\n" + textScore + "\nWant to play Again?")) {
        start.innerHTML = "Stop Game";
        memory_values = [];
        memory_card_ids = [];
        pairsFound = 0;
        pairs.innerHTML = pairsFound;
        clearInterval(timer);
        totalSec = 0;
        min.innerHTML = '00';
        sec.innerHTML = '00';
        memoryBoard();
    } else {
        stop();
    }
}