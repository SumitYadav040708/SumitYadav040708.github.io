document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  const botResponses = {
    greetings: {
      patterns: ["hello", "hi", "hey", "good morning", "good afternoon"],
      responses: ["Hello! 😊 How can I assist you?", "Hi there! What can I do for you?", "Hey! Ready for some fun?"]
    },
    farewells: {
      patterns: ["bye", "goodbye", "see you", "quit", "exit"],
      responses: ["Goodbye! Have a great day! 👋", "See you later!", "Come back anytime!"]
    },
    thanks: {
      patterns: ["thank you", "thanks", "appreciate"],
      responses: ["You're welcome! 😊", "My pleasure!", "Always happy to help!"]
    },
    help: {
      patterns: ["help", "support", "assist"],
      responses: ["I can:\n- Tell jokes\n- Share facts\n- Discuss tech\n- Play word games", "Ask me about:\n• Space\n• Animals\n• Programming\n• Random trivia"]
    },
    weather: {
      patterns: ["weather", "forecast", "temperature"],
      responses: ["🌞 Sunny 28°C with light breeze", "⛅ Partly cloudy 22°C", "🌧️ 60% chance of rain tomorrow"]
    },
    jokes: {
      patterns: ["joke", "funny", "laugh", "humor"],
      responses: [
        "Why do Java developers wear glasses? Because they can't C#! 😂",
        "What do you call a fake noodle? An Impasta! 🍝",
        "Why did the cookie go to the doctor? It was feeling crumbly! 🍪"
      ]
    },
    feedback: {
      patterns: ["bad", "terrible", "worst", "not funny", "awful"],
      responses: [
        "Oops! Let me try again 🤖",
        "My joke generator needs oiling! 🔧 How about this:",
        "I'll redeem myself! 😅 Try this:"
      ]
    },
    default: [
      "Interesting! Tell me more 🤔",
      "I'm learning every day! Can you explain differently?",
      "Let's explore this together! 💡"
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
    
    if (botResponses.feedback.patterns.some(word => lowerInput.includes(word))) {
      const feedback = botResponses.feedback.responses[Math.floor(Math.random() * botResponses.feedback.responses.length)];
      const newJoke = botResponses.jokes.responses[Math.floor(Math.random() * botResponses.jokes.responses.length)];
      return `${feedback}\n${newJoke}`;
    }

    // Detect name
    if (!context.userName && /(name is|call me|i'm)\s(.+)/i.test(input)) {
      context.userName = input.match(/(name is|call me|i'm)\s(.+)/i)[2];
      return `Nice to meet you, ${context.userName}! 😊 How can I help?`;
    }

    // Mood detection
    const positiveWords = ["happy", "good", "great", "awesome"];
    const negativeWords = ["sad", "bad", "angry", "upset"];
    
    if (positiveWords.some(word => lowerInput.includes(word))) {
      context.mood = "positive";
    } else if (negativeWords.some(word => lowerInput.includes(word))) {
      context.mood = "negative";
    }

    // Pattern matching
    for (const [category, data] of Object.entries(botResponses)) {
      if (category === "default") continue;
      if (data.patterns.some(pattern => lowerInput.includes(pattern))) {
        context.lastTopic = category;
        return data.responses[Math.floor(Math.random() * data.responses.length)];
      }
    }

   
    if (context.lastTopic === "jokes") {
      return "Want to hear another joke? 😄";
    }

  
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

        // Mood response
        if (context.mood === "positive") {
          addMessage("🎉 Glad you're feeling good! Let's keep it going!", false);
        } else if (context.mood === "negative") {
          addMessage("🤗 I'm here to help cheer you up! Try asking for a joke!", false);
        }
      }, 800);
    }
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });

  // Initial message
  setTimeout(() => {
    addMessage("🤖 Hi! I'm CyberBot 3000!\nType 'joke' for humor or 'help' for options", false);
  }, 500);
});
