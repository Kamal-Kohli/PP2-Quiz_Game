const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];

// availableQuestion Array
function setAvailabeQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

// set question, options, and question number
function getNewQuestion(){
    // Question Number
    questionNumber.innerHTML = " Question " + (questionCounter + 1) + " of " + quiz.length;


    // Question and Set random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    //get the position of Question from availableQuestion Array
    const index1= availableQuestions.indexOf(questionIndex);

    // remove the questionIndex from availableQuestion for doesn't repeat the question
    availableQuestions.splice(index1,1);
    // push options to availableOptions Array
    const optionLen = currentQuestion.options.length
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }

    let animationDelay = 0.2;
    // Create optiond in HTML
    for(let i=0; i<optionLen; i++){
        //random otions
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        
        const index2 = availableOptions.indexOf(optionIndex);
        
        availableOptions.splice(index2,1);
    
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex ];
        option.id = optionIndex;
        option.style.animationDelay =animationDelay + 's';
        animationDelay = animationDelay = 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("oneclick","getResult(this)");
    }

    questionCounter++
}

// Get Result
function getResult(element){
    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
        element.classList.add("correct");
    }
    else{
        element.classList.add("wrong");

        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
   
    unclickableOptions();
}

function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
        quizOver();
    } 
    else{
        getNewQuestion();
    }
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML =percentage.toFixed() + "%";
    resultBox.querySelector(".total-score").innerHTML =correctAnswers +" / " + quiz.length;
} 

window.onload = function(){

    setAvailabeQuestions();

    getNewQuestion();
}