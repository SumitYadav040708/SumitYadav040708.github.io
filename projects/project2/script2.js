document.addEventListener("DOMContentLoaded", () => {
  // DOM 
  const cityInput = document.getElementById("city-input");
  const searchBtn = document.getElementById("search-btn");
  const weatherCard = document.querySelector(".weather-card");
  const cityName = document.getElementById("city-name");
  const weatherIcon = document.getElementById("weather-icon");
  const temperature = document.getElementById("temperature");
  const weatherDesc = document.getElementById("weather-description");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");

  // API
  const API_KEY = "d973be69aa9140a5d6124599b4044292"; 
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;


  searchBtn.addEventListener("click", fetchWeather);
  cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") fetchWeather();
  });


  async function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

 
    searchBtn.innerHTML = '<div class="loading"></div>';
    searchBtn.disabled = true;

    try {
      const response = await fetch(`${API_URL}&q=${city}`);
      const data = await response.json();

      if (data.cod === 200) {
        displayWeather(data);
      } else {
        showError(data.message || "City not found");
      }
    } catch (error) {
      showError("Failed to fetch weather data");
      console.error("Error:", error);
    } finally {
      // Reset button
      searchBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        Search
      `;
      searchBtn.disabled = false;
    }
  }


  function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDesc.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    
   
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].main;

  
    weatherCard.style.display = "block";
  }


  function showError(message) {
    weatherCard.style.display = "block";
    cityName.textContent = "Error";
    temperature.textContent = "--°C";
    weatherDesc.textContent = message;
    humidity.textContent = "--%";
    windSpeed.textContent = "-- km/h";
    weatherIcon.src = "";
  }
});
