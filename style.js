const quizBank = {
  SSC: [
    {
      question: "India ka capital kya hai?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      answer: "Delhi"
    },
    {
      question: "2 + 2 = ?",
      options: ["3", "4", "5", "6"],
      answer: "4"
    }
  ],

  IBPS: [
    {
      question: "IBPS full form?",
      options: [
        "Institute of Banking Personnel Selection",
        "Indian Bank Public Service",
        "Internal Banking System",
        "None"
      ],
      answer: "Institute of Banking Personnel Selection"
    }
  ],

  MOCK: [
    {
      question: "SSC ka full form?",
      options: [
        "Staff Selection Commission",
        "State Service Center",
        "Simple Study Course",
        "None"
      ],
      answer: "Staff Selection Commission"
    }
  ]
};

let currentQuiz = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

/* START QUIZ */
function startQuiz(type) {
  currentQuiz = quizBank[type];
  currentQuestion = 0;
  score = 0;

  showQuizScreen();
  loadQuestion(type);
}

/* SHOW QUIZ SCREEN */
function showQuizScreen() {
  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";
}

/* LOAD QUESTION */
function loadQuestion(type) {
  const q = currentQuiz[currentQuestion];

  document.getElementById("quiz").innerHTML = `
    <h2 id="timer">Time: 15</h2>
    <h3>Question ${currentQuestion + 1} / ${currentQuiz.length}</h3>

    <h1>${q.question}</h1>

    ${q.options.map(opt => `
      <button onclick="checkAnswer(this,'${opt}','${type}')">${opt}</button>
    `).join("")}
  `;

  startTimer(type);
}

/* TIMER */
function startTimer(type) {
  timeLeft = 15;

  timer = setInterval(() => {
    document.getElementById("timer").innerText = "Time: " + timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      nextQuestion(type);
    }
  }, 1000);
}

/* ANSWER CHECK */
function checkAnswer(btn, selected, type) {
  clearInterval(timer);

  const correct = currentQuiz[currentQuestion].answer;
  const buttons = document.querySelectorAll("#quiz button");

  buttons.forEach(b => {
    if (b.innerText === correct) b.style.background = "green";
    else if (b.innerText === selected) b.style.background = "red";
    b.disabled = true;
  });

  if (selected === correct) score++;

  setTimeout(() => nextQuestion(type), 800);
}

/* NEXT */
function nextQuestion(type) {
  currentQuestion++;

  if (currentQuestion < currentQuiz.length) {
    loadQuestion(type);
  } else {
    showResult(type);
  }
}

/* RESULT */
function showResult(type) {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";

  document.getElementById("result").innerHTML = `
    <h1>🎉 ${type} Quiz Finished</h1>
    <h2>Your Score: ${score} / ${currentQuiz.length}</h2>

    <button onclick="location.reload()">Back to Home</button>
  `;
}
