// ==========================
// DARK MODE
// ==========================

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// ==========================
// TODAY'S DATE
// ==========================

function loadDate() {
  const today = new Date();

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric"
  };

  const date = document.getElementById("todayDate");

  if (date) {
    date.innerHTML = today.toLocaleDateString("en-IN", options);
  }
}

// ==========================
// SEARCH
// ==========================

function searchCards() {

  const input = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  const cards = document.querySelectorAll(".dashboard-card");

  cards.forEach(card => {

    const name = card.dataset.name.toLowerCase();

    if (name.includes(input)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }

  });

}

// ==========================
// QUIZ DATA
// ==========================

const quizData = [

{
question:"India ka capital kya hai?",
options:["Mumbai","Delhi","Kolkata","Chennai"],
answer:"Delhi"
},

{
question:"2 + 2 = ?",
options:["3","4","5","6"],
answer:"4"
},

{
question:"SSC ka full form?",
options:[
"Staff Selection Commission",
"State Service Center",
"Simple Study Course",
"None"
],
answer:"Staff Selection Commission"
}

];

let currentQuestion = 0;
let score = 0;

function startQuiz() {

currentQuestion = 0;
score = 0;

showQuestion();

}

function showQuestion() {

const q = quizData[currentQuestion];

document.body.innerHTML = `

<div class="container text-center mt-5">

<h2>${q.question}</h2>

${q.options.map(opt => `

<button
class="btn btn-primary m-2"
onclick="checkAnswer('${opt}')">

${opt}

</button>

`).join("")}

</div>

`;

}

function checkAnswer(selected) {

if (selected === quizData[currentQuestion].answer) {
score++;
}

currentQuestion++;

if (currentQuestion < quizData.length) {

showQuestion();

} else {

showResult();

}

}

function showResult() {

document.body.innerHTML = `

<div class="container text-center mt-5">

<h1>🎉 Quiz Finished</h1>

<h3>Your Score : ${score}/${quizData.length}</h3>

<button
class="btn btn-success"
onclick="location.reload()">

Restart Quiz

</button>

</div>

`;

}

function startSSC() {
startQuiz();
}

function startIBPS() {
startQuiz();
}

function startMock() {
startQuiz();
}

// ==========================
// LOAD
// ==========================

window.onload = function () {

if (localStorage.getItem("theme") === "dark") {
document.body.classList.add("dark-mode");
}

loadDate();

};