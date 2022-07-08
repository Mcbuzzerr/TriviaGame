// Needed to seperate functions to be able to see these variables
// This was the first solution I found, I know it's far from the best
var correct;
var answersShuffled;
var globalIter = 0;
var score = 0;
// API STUFF
var amount = 10;
var difficulty = "easy";
var category = 9;
var results;
// Promises drive all this (What are Promises?)

// Interactables Setup

let easy_btn = document.getElementById("btn1");
let med_btn = document.getElementById("btn2");
let hard_btn = document.getElementById("btn3");

let ddGeneral = document.getElementById("dd1");
let ddAnimals = document.getElementById("dd2");
let ddMusic = document.getElementById("dd3");

let buttonTray = document.getElementById("buttonTray");

let actFrame = document.getElementById("activityFrame");
//Dropdown Menu - Don't forget to yoink dropdown code from this assignment for the side project
let dropdown = document.getElementById("dropdownToggle");


easy_btn.addEventListener("click", evt => {
    difficulty = "easy";
    start(difficulty);
})

med_btn.addEventListener("click", evt => {
    difficulty = "medium";
    start(difficulty);
})

hard_btn.addEventListener("click", evt => {
    difficulty = "hard";
    start(difficulty);
})


ddGeneral.addEventListener("click", evt => {
    category = 9;
    setVisible(buttonTray);
    dropdown.textContent = "General Knowledge";
})

ddAnimals.addEventListener("click", evt => {
    category = 27;
    setVisible(buttonTray);
    dropdown.textContent = "Animals";
})

ddMusic.addEventListener("click", evt => {
    category = 12;
    setVisible(buttonTray);
    dropdown.textContent = "Music";
})

function viewToggle(object) {
    let element = object;
    element.classList.toggle("show");
}

function setVisible(object) {
    let element = object;
    element.classList.add("show");
}

// Activity Frame - Main Quiz Activity

function start(difficulty) {
    actFrame.innerHTML = ""
    var url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;
    console.log(url);
    fetch(url) // Request data from url
        .then(r => r.json()) // When we get a response, do this
        .then(data => {
            results = data.results;
            console.log(results)
            display(globalIter);
        }) // Then do this
        .catch(err => console.log(err)); // If something goes wrong, do this
}


function display(i) {
    console.log(results);
    // Collecting and (un)organizing the json data to be displayed
    let question = results[i].question;
    correct = results[i].correct_answer;
    let incorrect = [];
    var answers = [correct]
    for (let index = 0; index < results[i].incorrect_answers.length; index++) {
        incorrect.push(results[i].incorrect_answers[index]);
        answers.push(results[i].incorrect_answers[index]);
    }
    answersShuffled = shuffle(answers);

    // Setting up the html
    let insideHTML = `<h3>${question}</h3>`
    for (let index = 0; index < answers.length; index++) {
        insideHTML = insideHTML + `<div onclick="userSelect(${index})" class="button">${answersShuffled[index]}</div>`
    }
    insideHTML = insideHTML + `<h4 id="score">Correct: ${score}/10</h4>
    <h4 id="progress">Question: ${globalIter + 1}/10</h4>`;

    // Submitting our html
    actFrame.innerHTML = insideHTML;
}

function userSelect(slot) {
    //console.log(slot);
    globalIter++;
    if (globalIter < results.length) {
        if (answersShuffled[slot] == correct) {
            console.log("Correct!");
            score++;
        } else {
            console.log("Wrong!");
        }
        display(globalIter);
    } else {
        actFrame.innerHTML = 
        `<h1>Results!</h1>
        <h4 id="score">Correct: ${score}/10</h4>
        <a href="javascript:window.location.reload(true)"><div class="button btn-small">Again?</div></a>`
    }
}

let shuffle = (array) => {
    for (let iter = 0; iter < Math.floor(Math.random() * 10); iter++) {
        array.unshift(array.pop());
    }
    return array;
}

// Dropdown Menu
dropdown.addEventListener("click", evt => {
    document.getElementById("dropContent").classList.toggle("show");
    document.getElementById("dropArrow").classList.toggle("up");
})

window.onclick = function(event) {
    if (!event.target.matches(".drop-btn")) {
        var dropdowns = document.getElementsByClassName("drop-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show")
            }
        }
    }
}
// End of Dropdown Menu