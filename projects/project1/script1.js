
// Project 1 JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // CRUD logic for movies list
  const movieInput = document.getElementById("movie-input");
  const addBtn = document.getElementById("add-btn");
  const movieList = document.getElementById("movie-list");

  let movies = JSON.parse(localStorage.getItem("movies")) || [];
  
  function renderMovies() {
    movieList.innerHTML = movies.map((movie, index) => `
      <div>${movie} <button onclick="removeMovie(${index})">X</button></div>
    `).join("");
  }
  
  // ... (rest of Project 1 JS)
});
