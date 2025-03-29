document.addEventListener("DOMContentLoaded", () => {
    const movieInput = document.getElementById("movie-input");
    const addBtn = document.getElementById("add-btn");
    const movieList = document.getElementById("movie-list");

    // Load movies from localStorage or initialize empty array
    let movies = JSON.parse(localStorage.getItem("movies")) || [];

    // Initial render
    renderMovies();

    // Add movie function
    addBtn.addEventListener("click", addMovie);

    // Enter key support
    movieInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addMovie();
    });

    function addMovie() {
        const movieName = movieInput.value.trim();
        
        if (movieName) {
            movies.push(movieName);
            localStorage.setItem("movies", JSON.stringify(movies));
            movieInput.value = "";
            renderMovies();
        }
    }

    // Delete movie function
    window.removeMovie = (index) => {
        movies.splice(index, 1);
        localStorage.setItem("movies", JSON.stringify(movies));
        renderMovies();
    };

    function renderMovies() {
        movieList.innerHTML = movies
            .map((movie, index) => `
                <div class="movie-item">
                    <span>${movie}</span>
                    <button onclick="removeMovie(${index})">Delete</button>
                </div>
            `)
            .join("");
    }
});
