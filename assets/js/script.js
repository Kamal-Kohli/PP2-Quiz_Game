
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// availableQuestion Array
function setAvailabeQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i]);
    }
}

// set question, options, and question number
function getNewQuestion(){
    // Question Number counter
    questionNumber.innerHTML = " Question " + (questionCounter + 1) + " of " + quiz.length;

    // Question and Set random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    //get the position of Question from availableQuestion Array
    const index1= availableQuestions.indexOf(questionIndex);
    // Remove Question Index to availableOptions Array
    availableQuestions.splice(index1,1);

    // Set Lenght of options
    const optionLen = currentQuestion.options.length;
    // push options to availableOptions Array
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i);
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    // Create optiond in HTML
    for(let i=0; i<optionLen; i++){
        //random otions
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of optionIndex from the availableOptions
        const index2 = availableOptions.indexOf(optionIndex);
        // Remove the optionIndex from the availableOptions.
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)"); 
    }

    questionCounter++;
}

// Get Result of attempt question
function getResult(element){
    const id = parseInt(element.id);

     // get the answer by comparing the id of clicked options
    if(id === currentQuestion.answer){
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        // Indicate wrong mark
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");

        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
   attempt++;
   unclickableOptions();
}

// Make all the options unclickable once the user select a option.
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    } 
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){
    if(questionCounter === quiz.length){
        quizOver();
    } 
    else{
        getNewQuestion();
    }
}

function quizOver(){

    // Hide Quiz Box
    quizBox.classList.add("hide");
    // Show Result Box
    resultBox.classList.remove("hide");
    quizResult();
}

// Quiz result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers +" / " + quiz.length;
} 

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function playAgain(){
    // Hide result box
    resultBox.classList.add("hide");
    // Show Quiz box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function Home(){
    // Hide result box
    resultBox.classList.add("hide");
    // Show home box
    homeBox.classList.remove("hide");
    resetQuiz();
}

// Starting Point of the Quiz
function  startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");

    setAvailabeQuestions();
    getNewQuestion();
    answersIndicator();

}


window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
};