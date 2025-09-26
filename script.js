const questions = [
  {
    question: "When you get a lot of messages at once, what’s your first instinct?",
    answers: [
      { text: "Sort, group and forward to right people", team: "Reprezentare" },
      { text: "Reply directly and solve them yourself", team: "Consiliere" },
      { text: "Turn them into a FAQ or resource", team: "Informare" }
    ]
  },
  {
    question: "You notice the same problem happening in multiple groups. You:",
    answers: [
      { text: "Collect examples & escalate via year reps", team: "Reprezentare" },
      { text: "Talk to students directly to understand", team: "Consiliere" },
      { text: "Write a post to explain and prevent", team: "Informare" }
    ]
  },
  {
    question: "Which task sounds most fun to you?",
    answers: [
      { text: "Sending updates to year reps & compiling feedback", team: "Reprezentare" },
      { text: "Talking with students and figuring out their needs", team: "Consiliere" },
      { text: "Writing posts, emails, or guides", team: "Informare" }
    ]
  }
];

let currentQuestion = 0;
let scores = { Reprezentare: 0, Consiliere: 0, Informare: 0 };

function startQuiz() {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
  updateProgressBar();
}

function showQuestion() {
  const q = questions[currentQuestion];
  const container = document.getElementById("question-container");
  container.innerHTML = `
    <h2 class="text-xl font-bold mb-4">${q.question}</h2>
    <div class="space-y-3">
      ${q.answers.map(a => `
        <button onclick="selectAnswer('${a.team}')" 
                class="block w-full bg-white border border-gray-300 px-4 py-3 rounded-xl hover:bg-blue-50">
          ${a.text}
        </button>`).join('')}
    </div>
  `;
  document.getElementById("prev-btn").classList.toggle("hidden", currentQuestion === 0);
  updateProgressBar();
}

function updateProgressBar() {
  const progress = ((currentQuestion) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;
}

function selectAnswer(team) {
  scores[team]++;
  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function showResults() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("results").classList.remove("hidden");
  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  document.getElementById("result-text").innerText =
    winner + " 🎉\nYou seem to be a great fit for this team!";
}

function restartQuiz() {
  currentQuestion = 0;
  scores = { Reprezentare: 0, Consiliere: 0, Informare: 0 };
  document.getElementById("results").classList.add("hidden");
  document.getElementById("landing").classList.remove("hidden");
  document.getElementById("progress-bar").style.width = "0%";
}
