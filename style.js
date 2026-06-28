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

/* ---------- START QUIZ ---------- */
function startQuiz(type) {
  currentQuiz = quizBank[type];
  currentQuestion = 0;
  score = 0;
  showQuestion(type);
}

/* ---------- TIMER ---------- */
function startTimer(type) {
  timeLeft = 15;
  updateProgress();

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion(type);
    }
  }, 1000);
}

/* ---------- QUESTION UI ---------- */
function showQuestion(type) {
  const q = currentQuiz[currentQuestion];

  document.body.innerHTML = `
    <div style="text-align:center;padding:20px;font-family:Arial;background:#f5f7ff;min-height:100vh;">

      <h3 id="progress"></h3>
      <h2 id="timer">Time: 15</h2>

      <h1>${q.question}</h1>

      <div>
        ${q.options.map(opt => `
          <button onclick="checkAnswer(this, '${opt}', '${type}')"
            style="display:block;margin:10px auto;padding:12px 20px;width:220px;border:none;border-radius:10px;background:#4a6cf7;color:white;">
            ${opt}
          </button>
        `).join("")}
      </div>

    </div>
  `;

  startTimer(type);
}

/* ---------- ANSWER CHECK ---------- */
function checkAnswer(btn, selected, type) {
  clearInterval(timer);

  const correct = currentQuiz[currentQuestion].answer;
  const buttons = document.querySelectorAll("button");

  buttons.forEach(b => {
    if (b.innerText === correct) {
      b.style.background = "green";
    } else if (b.innerText === selected) {
      b.style.background = "red";
    }
    b.disabled = true;
  });

  if (selected === correct) score++;

  setTimeout(() => nextQuestion(type), 1000);
}

/* ---------- NEXT ---------- */
function nextQuestion(type) {
  currentQuestion++;

  if (currentQuestion < currentQuiz.length) {
    showQuestion(type);
  } else {
    showResult(type);
  }
}

/* ---------- PROGRESS BAR ---------- */
function updateProgress() {
  const total = currentQuiz.length;
  document.getElementById("progress")?.innerText =
    `Question ${currentQuestion + 1} / ${total}`;
}

/* ---------- RESULT ---------- */
function showResult(type) {
  localStorage.setItem("lastScore", score);

  document.body.innerHTML = `
    <div style="text-align:center;padding:30px;font-family:Arial;">
      <h1>🎉 ${type} Quiz Finished</h1>
      <h2>Your Score: ${score} / ${currentQuiz.length}</h2>

      <p>Last Saved Score: ${localStorage.getItem("lastScore")}</p>

      <button onclick="location.reload()"
        style="padding:10px 20px;border:none;background:#4a6cf7;color:white;border-radius:10px;">
        Back to Home
      </button>
    </div>
  `;
}

/* ---------- HOME BUTTONS ---------- */
function startSSC() {
  startQuiz("SSC");
}

function startIBPS() {
  startQuiz("IBPS");
}

function startMock() {
  startQuiz("MOCK");
}
function showHome() {
  document.getElementById("home").style.display = "block";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "none";
}

function showQuizScreen() {
  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";
}

function showResultScreen() {
  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
}