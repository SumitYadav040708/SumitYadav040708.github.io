
// Project 2 JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "YOUR_API_KEY";
  const cityInput = document.getElementById("city-input");
  const searchBtn = document.getElementById("search-btn");
  
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  });

  async function fetchWeather(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      // ... (rest of weather app logic)
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
