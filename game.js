const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
// const Quiz_timer = document.getElementById('#Timer');

    
 

const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
// let Timer =  100;
let questionCounter = 0;
let availableQuesions = [];


let questions = [
    {
        question: 'commonly used data types DO NOT include?',
        choice1: 'strings',
        choice2: 'booleans',
        choice3: 'alerts',
        choice4: 'numbers',
        answer: 3,
    },
     {
    question: 'The condition in an if/else statemnets is enclose with in _____?',
    choice1: 'quotes',
    choice2: 'curly brackets',
    choice3: 'parenthesis',
    choice4: 'square brackets',
    answer: 3,
     },

    {
        question: 'Arrays in javascript is used to store ___?',
        choice1: 'numbers and string',
        choice2: 'other Arrays',
        choice3: 'booleans',
        choice4: 'all of the above',
        answer: 4,
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variable.?',
        choice1: 'commas',
        choice2: 'curly brackets',
        choice3: 'quotes',
        choice4: 'parenthesis',
        answer: 2, 
        
    },

    {

        question: 'A very useful tool used during development and debugging for printing content to the debugger is:?',
        choice1: 'javascript',
        choice2: 'terminal/bash',
        choice3: 'for loops',
        choice4: 'console.log',
        answer: 4, 

    },
];
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  Timer = 100;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
   
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
 
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      
      if (classToApply === "incorrect") {
        totalSeconds = totalSeconds - 10;
      }  

    

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});



const TimerSeconds = document.querySelector("#Timer");

let totalSeconds = 100;
const timer = setInterval(startTimer, 1000);

function startTimer(){
    if(totalSeconds < 0){
    	TimerSeconds.innerHTML = "0";
        clearInterval(timer);
    }else{
    	TimerSeconds.innerHTML = totalSeconds;
    }
    totalSeconds--;
};

startGame();