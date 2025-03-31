document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("quiz-container");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next-btn");
  const resultElement = document.getElementById("result");

  let currentQuestionIndex = 0;
  let score = 0;

  // 10 questions 
  const allQuestions = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5"],
      answer: "4"
    },
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin"],
      answer: "Paris"
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "Python", "JavaScript"],
      answer: "JavaScript"
    },
    {
      question: "What is the boiling point of water (in °C)?",
      options: ["90", "100", "110"],
      answer: "100"
    },
    {
      question: "What is the largest planet in our Solar System?",
      options: ["Earth", "Jupiter", "Mars"],
      answer: "Jupiter"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen"],
      answer: "William Shakespeare"
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Oxygen", "Gold", "Osmium"],
      answer: "Oxygen"
    },
    {
      question: "What is the smallest prime number?",
      options: ["1", "2", "3"],
      answer: "2"
    },
    {
      question: "In which continent is the Amazon Rainforest located?",
      options: ["Africa", "South America", "Asia"],
      answer: "South America"
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yen", "Won", "Dollar"],
      answer: "Yen"
    }
  ];

  // Shuffle allQuestions and pick 5 random ones
  const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
  const questions = shuffledQuestions.slice(0, 5);

  function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = "";
    question.options.forEach(option => {
      const button = document.createElement("div");
      button.className = "option";
      button.textContent = option;
      button.addEventListener("click", () => selectAnswer(option));
      optionsElement.appendChild(button);
    });
    nextButton.style.display = "none"; // Hide Next button for new question
  }

  function selectAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
      score++;
      resultElement.textContent = "Correct!";
    } else {
      resultElement.textContent = "Wrong!";
    }
    nextButton.style.display = "block"; 
  }

  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      resultElement.textContent = "";
    } else {
      quizContainer.innerHTML = `<h2>Quiz Completed! Your score: ${score}/5</h2>`;
    }
  });

  showQuestion(); 
});
