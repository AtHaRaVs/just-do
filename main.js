//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let selectScreen = document.querySelector(".select-screen");
let startButton = document.getElementById("start-button");
let dsaSubjectButton = document.getElementById("dsa-subject-button");
let oopsSubjectButton = document.getElementById("oops-subject-button");
let dbmsSubjectButton = document.getElementById("dbms-subject-button")
let osSubjectButton = document.getElementById("os-subject-button")
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
let selectedSubject = 0;

//Questions and Options array

const DSAquizArray = [
    {
        id: "0",
        question: "Which of the following language was developed as the first purely object programming language?",
        options: ["SmallTalk", "C++", "Kotlin", "Java"],
        correct: "SmallTalk",
    },
    {
        id: "1",
        question: "Who developed object-oriented programming?",
        options: ["Adele Goldberg", "Dennis Ritchie", "Alan Kay", "Andrea Ferro"],
        correct: "Alan Kay",
    },
    {
        id: "2",
        question: "Which of the following is not an OOPS concept?",
        options: ["Encapsulation", "Polymorphism", "Exception", "Abstraction"],
        correct: "Exception",
    },
    {
        id: "3",
        question: "Which feature of OOPS described the reusability of code?",
        options: ["Abstraction", "Encapsulation", "Polymorphism", "Inheritance"],
        correct: "Inheritance",
    },
    {
        id: "4",
        question: "Which of the following language supports polymorphism but not the classes?",
        options: ["C++ programming language", "Java programming language", "Ada programming language", "C# programming language"],
        correct: "Ada programming language",
    },
    {
        id: "5",
        question: "Which among the following feature is not in the general definition of OOPS?",
        options: ["Modularity", "Efficient Code", "Code reusability", "Duplicate or Redundant Data"],
        correct: "Duplicate or Redundant Data",
    },
];

const DBMSquizArray = [
    {
        id: "0",
        question: " Which of the following is generally used for performing tasks like creating the structure of the relations, deleting relation?",
        options: ["DML(Data Manipulation Language)", "Query", "Relational Schema", "DDL(Data Definition Language)"],
        correct: "DDL(Data Definition Language)",
    },
    {
        id: "1",
        question: "Which of the following provides the ability to query information from the database and insert tuples into, delete tuples from, and modify tuples in the database?",
        options: ["DML(Data Manipulation Language)", "DDL(Data Definition Language)", "Query", "Relational Schema"],
        correct: "DML(Data Manipulation Language)",
    },
    {
        id: "2",
        question: "Which one of the following given statements possibly contains the error?",
        options: ["select * from emp where empid = 10003;", "select empid from emp where empid = 10006;", "select empid from emp;", "select empid where empid = 1009 and Lastname = 'GELLER';"],
        correct: "select empid where empid = 1009 and Lastname = 'GELLER';",
    },
    {
        id: "3",
        question: "What do you mean by one to many relationships?",
        options: ["One class may have many teachers", "One teacher can have many classes", "Many classes may have many teachers", "Many teachers may have many classes"],
        correct: "One teacher can have many classes",
    },
    {
        id: "4",
        question: "A Database Management System is a type of _________software.",
        options: ["It is a type of system software", "It is a kind of application software", "It is a kind of general software", "Both A and C"],
        correct: "It is a type of system software",
    },
    {
        id: "5",
        question: "The term ( FAT ) is stands for_____",
        options: ["File Allocation Tree", "File Allocation Table", "File Allocation Graph", "All of the above"],
        correct: "File Allocation Table",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == DSAquizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            if (selectedSubject == 1) {
                //display questionCount
                countOfQuestion.innerHTML =
                    questionCount + 1 + " of " + DSAquizArray.length + " Question";
                //display quiz
                quizDisplay(questionCount);
                count = 11;
                clearInterval(countdown);
                timerDisplay();
            } else if (selectedSubject == 2) {
                //display questionCount
                countOfQuestion.innerHTML =
                    questionCount + 1 + " of " + DBMSquizArray.length + " Question";
                //display quiz
                quizDisplay(questionCount);
                count = 11;
                clearInterval(countdown);
                timerDisplay();
            }
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    if (selectedSubject == 1) {
        //randomly sort questions
        DSAquizArray.sort(() => Math.random() - 0.5);
        //generate quiz
        for (let i of DSAquizArray) {
            //randomly sort options
            i.options.sort(() => Math.random() - 0.5);
            //quiz card creation
            let div = document.createElement("div");
            div.classList.add("container-mid", "hide");
            //question number
            countOfQuestion.innerHTML = 1 + " of " + DSAquizArray.length + " Question";
            //question
            let question_DIV = document.createElement("p");
            question_DIV.classList.add("question");
            question_DIV.innerHTML = i.question;
            div.appendChild(question_DIV);
            //options
            div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
            quizContainer.appendChild(div);
        }
    } else if (selectedSubject == 2) {
        //randomly sort questions
        DBMSquizArray.sort(() => Math.random() - 0.5);
        //generate quiz
        for (let i of DBMSquizArray) {
            //randomly sort options
            i.options.sort(() => Math.random() - 0.5);
            //quiz card creation
            let div = document.createElement("div");
            div.classList.add("container-mid", "hide");
            //question number
            countOfQuestion.innerHTML = 1 + " of " + DBMSquizArray.length + " Question";
            //question
            let question_DIV = document.createElement("p");
            question_DIV.classList.add("question");
            question_DIV.innerHTML = i.question;
            div.appendChild(question_DIV);
            //options
            div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
            quizContainer.appendChild(div);
        }
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (selectedSubject == 1) {
        if (userSolution === DSAquizArray[questionCount].correct) {
            userOption.classList.add("correct");
            scoreCount++;
        } else {
            userOption.classList.add("incorrect");
            //For marking the correct option
            options.forEach((element) => {
                if (element.innerText == DSAquizArray[questionCount].correct) {
                    element.classList.add("correct");
                }
            });
        }
    } else if (selectedSubject == 2) {
        if (userSolution === DBMSquizArray[questionCount].correct) {
            userOption.classList.add("correct");
            scoreCount++;
        } else {
            userOption.classList.add("incorrect");
            //For marking the correct option
            options.forEach((element) => {
                if (element.innerText == DBMSquizArray[questionCount].correct) {
                    element.classList.add("correct");
                }
            });
        }
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and hide start screen and display select subject
window.onload = () => {
    selectScreen.classList.remove("hide");
    startScreen.classList.add("hide");
    displayContainer.classList.add("hide");
};

//button fucntionality of select-subject screen
dsaSubjectButton.addEventListener("click", () => {
    selectScreen.classList.add("hide");
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
    selectedSubject = 1;
});
dbmsSubjectButton.addEventListener("click", () => {
    selectScreen.classList.add("hide");
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
    selectedSubject = 2;
});
oopsSubjectButton.addEventListener("click", () => {
    selectScreen.classList.add("hide");
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
    selectedSubject = 3;
});
osSubjectButton.addEventListener("click", () => {
    selectScreen.classList.add("hide");
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
    selectedSubject = 4;
});