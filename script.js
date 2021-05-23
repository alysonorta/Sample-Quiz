//Create variables
var startButton = document.getElementById("startButton");
var nextButton = document.getElementById("nextButton");
var questionContainerElements = document.getElementById("questionContainer")
var questionElement = document.getElementById("question")
var answerButtonsElement = document.getElementById("answerButtons");
var timer = document.getElementById("seconds-left");
var score = 0;

var shuffledQuestions, currentQuestionIndex

//Add click events for both startButton and nextButton
startButton.addEventListener("click", startQuiz)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

//Add function to load timer when page loads and start timer when button is clicked

document.addEventListener('DOMContentLoaded', () => {
    var timeLeft = 30;
    function countdown () {
        setInterval(function (){
            if (timeLeft <= 0) {
                clearInterval (timeLeft = 0)}
        timer.innerHTML = timeLeft
        timeLeft -=1        
    }, 1000)}

    startButton.addEventListener("click", countdown);
})

//Add function to start the quiz
function startQuiz() {
    score = 0;
    startButton.classList.add('hide')
    shuffledQuestions = quizQuestions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElements.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

//Add function to show questions after quiz has been started
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })


}

//Add function to reset the state of the quiz container 
function resetState(){
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

//Add function to target which button was selected and what to do with that information
function selectAnswer (e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = "Great Job!"
        startButton.classList.remove('hide')
    }
    if(selectedButton.dataset = correct) {
        score++;
    }
    document.getElementById("score").innerHTML = score;
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Creating quiz questions array

var quizQuestions = [
    {
        question: "Which type of variable is visible everywhere in your JavaScript code?",
        answers: [
            {text: "global variable", correct: true},
            {text: "local variable", correct: false},
            {text: "Both global and local", correct: false},
            {text: "None of the above", correct: false},
        ],
    },
    {
        question: "JavaScript and Java are the same thing.",
        answers: [
            {text: "true", correct: false},
            {text: "false", correct: true},
        ],

    },
    {
        question: "Which built-in method combines the text of two strings and returns a new string",
        answers: [
            {text: "attach()", correct: false},
            {text: "append()", correct: false},
            {text: "concat()", correct: true},
            {text: "slice()", correct: false},
        ]
    },
    {
        question: "Which of the following function of Array object returns true if every element in this array satisfies the provided testing function?",
        answers: [
            {text: "concat()", correct: false},
            {text: "every()", correct: true},
            {text: "push()", correct: false},
            {text: "some()", correct: false},
        ]
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            {text: "<script>", correct: true},
            {text: "<js>", correct: false},
            {text: "<scripting>", correct: false},
            {text: "<javascript>", correct: false},
        ]
    },

]


