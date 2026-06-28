const quizData = [
  {
    question: "India ka capital kya hai?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "SSC ka full form?",
    options: ["Staff Selection Commission", "State Service Center", "Simple Study Course", "None"],
    answer: "Staff Selection Commission"
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
    <div style="text-align:center; padding:20px;">
      <h2>${q.question}</h2>
      ${q.options.map(opt => `
        <button onclick="checkAnswer('${opt}')"
          style="display:block;margin:10px auto;padding:10px 20px;">
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
    <div style="text-align:center; padding:30px;">
      <h1>Quiz Finished 🎉</h1>
      <h2>Your Score: ${score} / ${quizData.length}</h2>
      <button onclick="location.reload()">Restart</button>
    </div>
  `;
}

/* buttons connect */
function startSSC() {
  startQuiz();
}

function startIBPS() {
  startQuiz();
}

function startMock() {
  startQuiz();
}