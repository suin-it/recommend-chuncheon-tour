// 1. 점수판
const scores = {
  food: 0,
  cafe: 0,
  activity: 0,
  nature: 0,
  photo: 0,
  festival: 0
};

// 2. 질문 데이터
const questions = [
  {
    question: "여행에서 가장 중요한 건?",
    answers: [
      { text: "맛있는 음식", score: { food: 2 } },
      { text: "분위기 좋은 카페", score: { cafe: 2 } },
      { text: "몸으로 즐기는 활동", score: { activity: 2 } },
      { text: "조용한 자연", score: { nature: 2 } }
    ]
  },
  {
    question: "여행 스타일은?",
    answers: [
      { text: "즉흥적으로 돌아다니기", score: { activity: 1, festival: 1 } },
      { text: "천천히 여유롭게", score: { nature: 1, cafe: 1 } }
    ]
  },
  {
    question: "사진 찍는 건?",
    answers: [
      { text: "중요하다", score: { photo: 2, cafe: 1 } },
      { text: "크게 신경 안 쓴다", score: { activity: 1, food: 1 } }
    ]
  },
  {
    question: "하루 일정은?",
    answers: [
      { text: "여러 곳 돌아다니기", score: { activity: 2 } },
      { text: "한두 곳 오래 머물기", score: { cafe: 1, nature: 1 } }
    ]
  },
  {
    question: "사람 많은 곳은?",
    answers: [
      { text: "북적여도 괜찮다", score: { festival: 2, food: 1 } },
      { text: "조용한 곳이 좋다", score: { nature: 2, cafe: 1 } }
    ]
  },
  {
    question: "여행 마무리는?",
    answers: [
      { text: "맛집에서 식사", score: { food: 2 } },
      { text: "카페에서 여유", score: { cafe: 2 } },
      { text: "야경이나 산책", score: { nature: 1, photo: 1 } },
      { text: "체험이나 이벤트", score: { activity: 1, festival: 1 } }
    ]
  }
];

// 3. 결과 데이터
const results = {
  "food_activity": {
    name: "🍗 맛집 액티브형",
    description: "맛있는 것도 포기 못하고, 가만히 있는 것도 못 참는 타입입니다.",
    course: ["춘천 닭갈비 골목", "강촌 레일바이크", "구봉산 카페거리"]
  },
  "cafe_photo": {
    name: "☕ 감성 카페형",
    description: "분위기, 사진, 여유를 모두 중요하게 생각하는 타입입니다.",
    course: ["구봉산 카페거리", "공지천", "소양강 스카이워크"]
  },
  "nature_cafe": {
    name: "🍃 힐링 카페형",
    description: "조용한 자연과 감성적인 공간을 좋아하는 타입입니다.",
    course: ["공지천", "구봉산 카페거리", "소양강"]
  },
  "nature_photo": {
    name: "📸 감성 사진형",
    description: "풍경과 사진이 여행의 핵심인 타입입니다.",
    course: ["소양강 스카이워크", "의암호", "구봉산 전망대"]
  },
  "activity_festival": {
    name: "🎢 활동 몰입형",
    description: "몸으로 직접 즐기는 여행을 선호하는 타입입니다.",
    course: ["강촌 레일바이크", "춘천 카누 체험", "삼악산 케이블카"]
  },
  "festival_food": {
    name: "🎉 축제 즐김형",
    description: "사람 많은 곳과 먹거리, 이벤트를 즐기는 타입입니다.",
    course: ["춘천 마임축제", "막국수닭갈비축제", "춘천 명동"]
  },
  "food_cafe": {
    name: "🍰 맛집 카페형",
    description: "먹고 마시는 즐거움이 여행의 중심인 타입입니다.",
    course: ["춘천 닭갈비 골목", "감성 디저트 카페", "구봉산 카페거리"]
  },
  "default": {
    name: "🧭 균형 잡힌 여행형",
    description: "먹거리, 산책, 감성을 적당히 즐기는 균형형 타입입니다.",
    course: ["춘천 명동", "공지천", "소양강 스카이워크"]
  }
};

// 4. 현재 질문 번호
let currentQuestionIndex = 0;

// 5. HTML 요소 가져오기
const questionBox = document.querySelector("#question");
const answerBox = document.querySelector("#answers");
const resultBox = document.querySelector("#result");

// 6. 질문 보여주기
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionBox.textContent = currentQuestion.question;
  answerBox.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;

    button.addEventListener("click", () => {
      addScore(answer.score);
      nextQuestion();
    });

    answerBox.appendChild(button);
  });
}

// 7. 점수 더하기
function addScore(scoreObject) {
  for (const key in scoreObject) {
    scores[key] += scoreObject[key];
  }
}

// 8. 다음 질문으로 이동
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 9. 결과 계산
function getTopTwoTypes() {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map((item) => item[0]);
}

// 10. 결과 보여주기
function showResult() {
  questionBox.style.display = "none";
  answerBox.style.display = "none";

  const topTwo = getTopTwoTypes();

  const key1 = `${topTwo[0]}_${topTwo[1]}`;
  const key2 = `${topTwo[1]}_${topTwo[0]}`;

  const result = results[key1] || results[key2] || results.default;

  resultBox.innerHTML = `
    <h2>${result.name}</h2>
    <p>${result.description}</p>

    <h3>추천 코스</h3>
    <ol>
      ${result.course.map((place) => `<li>${place}</li>`).join("")}
    </ol>

    <button onclick="restartTest()">다시 테스트하기</button>
  `;
}

// 11. 다시 시작
function restartTest() {
  currentQuestionIndex = 0;

  for (const key in scores) {
    scores[key] = 0;
  }

  questionBox.style.display = "block";
  answerBox.style.display = "block";
  resultBox.innerHTML = "";

  showQuestion();
}

// 12. 시작
showQuestion();