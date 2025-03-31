document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("quiz-container");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next-btn");
  const resultElement = document.getElementById("result");

  let currentQuestionIndex = 0;
  let 

  const questions = [
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
    }
  ];

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
    nextButton.style.display = "none"; // Hide Next button for a new question
  }

  function selectAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
      score++;
      resultElement.textContent = "Correct!";
    } else {
      resultElement.textContent = "Wrong!";
    }
    nextButton.style.display = "block"; // Show Next button after an answer is selected
  }

  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      resultElement.textContent = "";
    } else {
      quizContainer.innerHTML = `<h2>Quiz Completed! Your score: ${score}/${questions.length}</h2>`;
    }
  });

  showQuestion(); // Display the first question on page load
});
