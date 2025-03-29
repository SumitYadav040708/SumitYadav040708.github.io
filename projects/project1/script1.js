document.addEventListener("DOMContentLoaded", () => {
  const movieInput = document.getElementById("movie-input");
  const addBtn = document.getElementById("add-btn");
  const movieList = document.getElementById("movie-list");

  // Load movies from localStorage or initialize empty array
  let movies = JSON.parse(localStorage.getItem("movies")) || [];

  // Function to render movies
  function renderMovies() {
    movieList.innerHTML = movies
      .map(
        (movie, index) => `
        <div class="movie-item">
          ${movie}
          <button onclick="removeMovie(${index})">Delete</button>
        </div>
      `
      )
      .join("");
  }

  // Add movie function
  addBtn.addEventListener("click", () => {
    const movieName = movieInput.value.trim();
    if (movieName) {
      movies.push(movieName);
      localStorage.setItem("movies", JSON.stringify(movies)); // Save to localStorage
      movieInput.value = ""; // Clear input
      renderMovies(); // Update the list
    }
  });

  // Remove movie function (must be global)
  window.removeMovie = (index) => {
    movies.splice(index, 1);
    localStorage.setItem("movies", JSON.stringify(movies));
    renderMovies();
  };

  // Initial render
  renderMovies();
});
