
document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  const botResponses = [
    "Hello! How can I help you today?",
    "I'm just a simple bot.",
    "That's interesting! Tell me more.",
    "I don't understand. Can you rephrase?",
    "Goodbye! Have a nice day."
  ];

  function addMessage(message, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.className = isUser ? "message user-message" : "message bot-message";
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse() {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  }

  sendBtn.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message) {
      addMessage(message, true);
      userInput.value = "";
      setTimeout(() => {
        addMessage(getBotResponse(), false);
      }, 1000);
    }
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });

  // Initial bot message
  addMessage("Hi there! I'm a simple chatbot. Type a message to start.", false);
});
