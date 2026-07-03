const questions = [
  {
    question:
      "Hangisi sera gazı salımını azaltmada en etkili yöntemlerden biridir?",
    answers: [
      "Yenilenebilir enerji kaynaklarını kullanmak",
      "Kömür tüketimini artırmak",
      "Ormanları tarım alanına dönüştürmek",
      "Fosil yakıt kullanımını yaygınlaştırmak",
    ],
    correct: 0,
  },

  {
    question: "Aşağıdakilerden hangisi yenilenebilir enerji kaynağı değildir?",
    answers: ["Petrol", "Rüzgâr", "Güneş", "Jeotermal"],
    correct: 0,
  },

  {
    question:
      "Ormansızlaşmanın iklim değişikliğini hızlandırmasının temel nedeni nedir?",
    answers: [
      "Ağaçların karbondioksiti emmesini engellemesi",
      "Toprağın daha verimli hâle gelmesi",
      "Yağış miktarını artırması",
      "Oksijen miktarını artırması",
    ],
    correct: 0,
  },

  {
    question:
      "Evlerde enerji tasarrufu sağlamak için aşağıdakilerden hangisi en doğru uygulamadır?",
    answers: [
      "Kullanılmayan elektrikli cihazların fişini çekmek",
      "Pencereleri sürekli açık bırakmak",
      "Eski ampulleri kullanmaya devam etmek",
      "Klima ve kaloriferi aynı anda çalıştırmak",
    ],
    correct: 0,
  },

  {
    question:
      "Ulaşım kaynaklı karbon salımını azaltmak için hangisi en uygun seçenektir?",
    answers: [
      "Toplu taşımayı tercih etmek",
      "Kısa mesafelerde otomobil kullanmak",
      "Motoru gereksiz yere çalıştırmak",
      "Tek kişilik araç kullanımını artırmak",
    ],
    correct: 0,
  },

  {
    question:
      "Aşağıdakilerden hangisi sürdürülebilir tarım uygulamalarından biridir?",
    answers: [
      "Su kaynaklarını verimli kullanmak",
      "Gereğinden fazla kimyasal gübre kullanmak",
      "Toprağı sürekli aynı ürünle ekmek",
      "Doğal alanları yok ederek tarım yapmak",
    ],
    correct: 0,
  },

  {
    question: "Geri dönüşümün en önemli faydalarından biri nedir?",
    answers: [
      "Doğal kaynak tüketimini azaltması",
      "Daha fazla çöp oluşmasını sağlaması",
      "Enerji tüketimini artırması",
      "Hava kirliliğini artırması",
    ],
    correct: 0,
  },

  {
    question:
      "İklim değişikliğiyle mücadelede bireylerin yapabileceği en etkili davranışlardan biri hangisidir?",
    answers: [
      "Gereksiz enerji tüketiminden kaçınmak",
      "Tek kullanımlık plastikleri daha fazla kullanmak",
      "İhtiyaç olmadığı hâlde araç kullanmak",
      "Geri dönüştürülebilir atıkları çöpe atmak",
    ],
    correct: 0,
  },
];
function shuffleAnswers(question) {
  // Doğru cevabın metnini sakla
  const correctAnswer = question.answers[question.correct];

  // Fisher-Yates algoritması ile cevapları karıştır
  for (let i = question.answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [question.answers[i], question.answers[j]] = [
      question.answers[j],
      question.answers[i],
    ];
  }

  // Doğru cevabın yeni indeksini bul
  question.correct = question.answers.indexOf(correctAnswer);
}
questions.forEach((question) => {
  shuffleAnswers(question);
});

let current = 0;
let score = 0;

function loadQuestion() {
  document.getElementById("result").innerHTML = "";

  const q = questions[current];

  document.getElementById("question").innerHTML =
    current + 1 + ". " + q.question;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  const continue_button = document.getElementById("continue");
  continue_button.style.display = "none";

  const result = document.getElementById("result");
  result.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerHTML = answer;

    btn.onclick = function () {
      if (index === q.correct) {
        score += 10;
        result.innerHTML = "✅ Doğru!";
      } else {
        result.innerHTML = "❌ Yanlış!\nDoğru cevap: " + q.answers[q.correct];
      }
      continue_button.style.display = "block";
      document.getElementById("score").innerHTML = "Puan: " + score;
    };

    continue_button.onclick = function () {
      current++;

      if (current < questions.length) {
        loadQuestion();
      } else {
        finishGame();
      }
    };
    answers.appendChild(btn);
  });
}

function finishGame() {
  document.getElementById("question").innerHTML = "";
  document.getElementById("answers").innerHTML = "";
  document.getElementById("continue").style.display = "none";
  document.getElementById("score").innerHTML = "";
  const return_button = document.createElement("button");
  const replay = document.createElement("button");
  const game = document.getElementsByClassName("game");
  replay.innerHTML = "Yeniden oyna!";
  return_button.style.background = "red";
  return_button.innerHTML = "Ana sayfaya geri dön";
  return_button.onclick = function () {
    window.location.href = "/";
  };
  replay.onclick = function () {
    window.location.reload();
  };
  game[0].appendChild(replay);
  game[0].appendChild(return_button);
  let message = "";

  if (score == 80) {
    message = "🏆 Mükemmel! Gerçek bir İklim Kahramanısın!";
  } else if (score >= 60) {
    message = "🌱 Harika! İklim konusunda oldukça bilinçlisin.";
  } else if (score >= 40) {
    message =
      "🙂 Güzel! Biraz daha öğrenerek çevreye daha fazla katkı sağlayabilirsin.";
  } else {
    message = "📚 İklim değişikliği hakkında biraz daha araştırma yapmalısın.";
  }

  document.getElementById("result").innerHTML =
    "<h2>Oyun Bitti!</h2><h3>Puanın: " +
    score +
    "/80</h3><p>" +
    message +
    "</p>";
}

loadQuestion();
