const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const questionContainer = document.querySelector(".option-container");

let questionCounter = 0;
let currectQuestion;
let availableQuestions = [];

// availableQuestion Array
function setAvailabeQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

// set question, options, and question number
function getNewQuestion(){
    questionNumber.innerHTML = "Question" + (questionCounter + 1) + "of" + quiz.length;


    // Question and Set random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currectQuestion = questionIndex;
    questionText.innerHTML = currectQuestion.q;
    console.log(questionIndex);

    questionCounter++
}

function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over")
    } else{
        getNewQuestion();
    }
}

window.onload = function(){

    setAvailabeQuestions();
    
    getNewQuestion();
}