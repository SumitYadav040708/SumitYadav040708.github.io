document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  const botResponses = {
    greetings: {
      patterns: ["hello", "hi", "hey", "good morning", "good afternoon"],
      responses: ["Hello! 😊 How can I assist you today?", "Hi there! What can I do for you?", "Hey! How can I help?"]
    },
    farewells: {
      patterns: ["bye", "goodbye", "see you", "quit", "exit"],
      responses: ["Goodbye! Have a great day! 👋", "See you later!", "Come back anytime!"]
    },
    thanks: {
      patterns: ["thank you", "thanks", "appreciate"],
      responses: ["You're welcome! 😊", "My pleasure!", "Glad I could help!"]
    },
    help: {
      patterns: ["help", "support", "assist"],
      responses: ["I can help with various topics. Ask me about:\n- Weather\n- News\n- Jokes\n- General knowledge", "How can I assist you today?"]
    },
    weather: {
      patterns: ["weather", "forecast", "temperature"],
      responses: ["Currently sunny 🌞 with 25°C in your area", "Expect scattered showers ☔ tomorrow", "The weather looks pleasant this week!"]
    },
    jokes: {
      patterns: ["joke", "funny", "laugh"],
      responses: ["Why don't scientists trust atoms? Because they make up everything! 😄", "What do you call fake spaghetti? An impasta! 🍝", "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾"]
    },
    default: [
      "Interesting! Could you elaborate?",
      "I'm still learning. Can you rephrase that?",
      "Let me think about that... 🤔",
      "Could you tell me more about that?",
      "I'm here to help! What would you like to know?"
    ]
  };

  let context = {
    lastTopic: null,
    userName: null,
    mood: "neutral"
  };

  function addMessage(message, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.className = isUser ? "message user-message" : "message bot-message";
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function analyzeInput(input) {
    const lowerInput = input.toLowerCase();
    
    // Check for name
    if (!context.userName && /(name is|call me|i'm)\s(.+)/i.test(input)) {
      context.userName = input.match(/(name is|call me|i'm)\s(.+)/i)[2];
      return `Nice to meet you, ${context.userName}! How can I help?`;
    }

    // Check sentiment
    const positiveWords = ["happy", "good", "great", "awesome"];
    const negativeWords = ["sad", "bad", "angry", "upset"];
    
    if (positiveWords.some(word => lowerInput.includes(word))) {
      context.mood = "positive";
    } else if (negativeWords.some(word => lowerInput.includes(word))) {
      context.mood = "negative";
    }

    // Check predefined patterns
    for (const [category, data] of Object.entries(botResponses)) {
      if (data.patterns.some(pattern => lowerInput.includes(pattern))) {
        context.lastTopic = category;
        const response = data.responses[Math.floor(Math.random() * data.responses.length)];
        return response;
      }
    }

    // Contextual follow-up
    if (context.lastTopic === "weather") {
      return "Would you like to know the extended forecast?";
    }

    // Fallback response
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  }

  sendBtn.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message) {
      addMessage(message, true);
      userInput.value = "";
      
      setTimeout(() => {
        const response = analyzeInput(message);
        addMessage(response, false);
        
        // Add mood-based response
        if (context.mood === "positive") {
          addMessage("Glad to hear you're feeling good! 😊", false);
        } else if (context.mood === "negative") {
          addMessage("I'm sorry to hear that. Let me know how I can help. 🤗", false);
        }
      }, 800);
    }
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });

  // Initial bot message with typing indicator
  setTimeout(() => {
    addMessage("Hi! I'm your smart assistant. 😊 You can ask me about weather, jokes, or just chat!", false);
  }, 500);
});
