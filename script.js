const questions = [
  {
    question: "Care dintre aceste opțiuni te reprezintă cel mai bine?",
    answers: [
      { text: "Să transmiți informații clar și organizat", team: "Informare" },
      { text: "Să vorbești și să reprezinți grupul", team: "Reprezentare" },
      { text: "Să asculți și să ajuți oamenii", team: "Consiliere" }
    ]
  },
  {
    question: "Dacă ai fi super-erou, ai vrea să ai puterea de…",
    answers: [
      { text: "A liniști și încuraja", team: "Consiliere" },
      { text: "A inspira mulțimi", team: "Reprezentare" },
      { text: "A face mesajele clare și vizibile pentru toată lumea", team: "Informare" }
    ]
  },
  {
    question: "Ce compliment te-ar face cel mai fericit?",
    answers: [
      { text: "„Datorită ție, anul nostru a rezolvat în sfârșit acea problemă.”", team: "Reprezentare" },
      { text: "„Ești mereu acolo să ne ajuți când suntem pierduți.”", team: "Consiliere" },
      { text: "„Postările tale mă învață întotdeauna ceva nou.”", team: "Informare" }
    ]
  },
  {
    question: "Care întâlnire ți-ar plăcea cel mai mult?",
    answers: [
      { text: "Orientare pentru studenții din primul an", team: "Consiliere" },
      { text: "Workshop despre tehnici de învățare", team: "Informare" },
      { text: "Ședință a Consiliului Facultății despre modificări de curriculum", team: "Reprezentare" }
    ]
  },
  {
    question: "Ce ai corecta prima dată dacă ai avea bagheta magică?",
    answers: [
      { text: "Să faci facultatea să asculte și să acționeze mai rapid la nevoile studenților", team: "Reprezentare" },
      { text: "Să fie toate informațiile disponibile într-un loc clar și accesibil", team: "Informare" },
      { text: "Să nu mai existe niciun student pierdut sau nesprijinit", team: "Consiliere" }
    ]
  },
  {
    question: "Primești un anunț de la facultate. Care este reacția ta?",
    answers: [
      { text: "Oferi să răspunzi întrebărilor studenților care nu au înțeles", team: "Consiliere" },
      { text: "Distribui mesajul către șefii de an pentru a te asigura că toți primesc informația", team: "Reprezentare" },
      { text: "Rescrii clar anunțul pentru studenți și îl postezi online", team: "Informare" }
    ]
  },
  {
    question: "Care sarcină ți se pare cea mai interesantă?",
    answers: [
      { text: "Colectarea feedback-ului studenților despre desfășurarea unui examen", team: "Reprezentare" },
      { text: "Moderarea grupurilor WhatsApp și asigurarea că toată lumea se simte sprijinită", team: "Consiliere" },
      { text: "Crearea unei postări despre oportunități Erasmus și distribuirea ei online", team: "Informare" }
    ]
  },
  {
    question: "Ce proiect ai alege să conduci?",
    answers: [
      { text: "Crearea unui newsletter despre burse, workshop-uri și internship-uri", team: "Informare" },
      { text: "Colaborarea cu liderii de an pentru a realiza un raport formal privind problemele cursurilor", team: "Reprezentare" },
      { text: "Organizarea unui eveniment de integrare pentru studenții noi", team: "Consiliere" }
    ]
  },
  {
    question: "Când lucrezi cu alții, preferi să…",
    answers: [
      { text: "Îi ajuți pe rând și răspunzi cu răbdare la întrebările lor", team: "Consiliere" },
      { text: "Pregătești materialele astfel încât să aibă totul disponibil de la început", team: "Informare" },
      { text: "Reprezinți grupul în întâlniri și vorbești în numele lor", team: "Reprezentare" }
    ]
  }
];

let currentQuestion = 0;
let scores = { Reprezentare: 0, Consiliere: 0, Informare: 0 };

const teamImages = {
  Reprezentare: "REPREZENTARE.png",
  Consiliere: "CONSILIERE.png",
  Informare: "INFORMARE.png",
};

const teamExplanation = {
  Reprezentare: "🔴 Ajută la comunicarea cu șefii de an și șefii de subgrupă\n🔴 Facilitează comunicarea dintre studenți și Conducerea Facultății\n🔴 Centralizează problemele sesizate de studenți",
  Consiliere: "🔵 Monitorizează grupurile de an de WhatsApp\n🔵 Răspunde la întrebările studenților venite pe pagina Ligii și pe grupurile de an\n🔵 Identifică nevoile studenților și ia măsuri pentru a le îndeplini",
  Informare: "🟣 Se ocupă cu generarea de conținut edu pentru articole / emailuri de pe Campus Virtual / postări ale Ligii\n🟣 Ajută studenții să descopere oportunități educaționale\n🟣 Realizează sesiuni de informare(întâlniri) cu studenții",
};

function fadeOut(element, callback) {
  element.classList.add("hidden-opacity");
  setTimeout(() => {
    if (callback) callback();
  }, 500);
}

function fadeIn(element) {
  element.classList.remove("hidden-opacity");
}

function startQuiz() {
  const landing = document.getElementById("landing");
  const quiz = document.getElementById("quiz");
  fadeOut(landing, () => {
    landing.classList.add("hidden");
    showQuestion();
    quiz.classList.remove("hidden");
    fadeIn(document.getElementById("question-container"));
  });
}

function showQuestion() {
  const q = questions[currentQuestion];
  const container = document.getElementById("question-container");
  
  fadeOut(container, () => {
    container.innerHTML = `
      <h2 class="text-xl font-bold mb-4">${q.question}</h2>
      <div class="space-y-3">
        ${q.answers.map(a => `
          <button onclick="selectAnswer('${a.team}')" 
                  class="block w-full bg-white border border-gray-300 px-4 py-3 rounded-xl transition-colors custom-hover">
            ${a.text}
          </button>`).join('')}
      </div>
    `;
    fadeIn(container);
  });

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
  const quiz = document.getElementById("quiz");
  const results = document.getElementById("results");
  const resultImage = document.getElementById("result-image");
  
  fadeOut(document.getElementById("question-container"), () => {
    quiz.classList.add("hidden");
    results.classList.remove("hidden");
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    resultImage.src = teamImages[winner] || "images/default-team.png";
    document.getElementById("result-text").innerText = teamExplanation[winner];
    fadeIn(results);
  });
}

function restartQuiz() {
  currentQuestion = 0;
  showQuestion();
  scores = { Reprezentare: 0, Consiliere: 0, Informare: 0 };
  const results = document.getElementById("results");
  const landing = document.getElementById("landing");
  
  fadeOut(results, () => {
    results.classList.add("hidden");
    landing.classList.remove("hidden");
    fadeIn(landing);
    document.getElementById("progress-bar").style.width = "0%";
  });
}
