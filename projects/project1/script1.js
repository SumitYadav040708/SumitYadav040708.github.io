document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('searchQuery').value.trim();
  const movieContainer = document.getElementById('movieContainer');
  movieContainer.innerHTML = '';

  if (!query) return;

  // Replace with your actual TMDB API key
  const apiKey = 'YOUR_TMDB_API_KEY';

  // Use the multi-search endpoint to look for both movies and people
  fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        movieContainer.innerHTML = `<p class="error-message">No results found. Please try a different query.</p>`;
        return;
      }

      // Try to find a movie result first
      const movieResult = data.results.find(item => item.media_type === 'movie');

      if (movieResult) {
        // Display the movie details in a landscape layout
        const poster = movieResult.poster_path 
          ? `https://image.tmdb.org/t/p/w300${movieResult.poster_path}`
          : 'https://via.placeholder.com/300x450?text=No+Poster';

        movieContainer.innerHTML = `
          <div class="movie">
            <img src="${poster}" alt="${movieResult.title} Poster">
            <div class="movie-details">
              <h2>${movieResult.title} (${movieResult.release_date ? movieResult.release_date.slice(0, 4) : 'N/A'})</h2>
              <p>${movieResult.overview ? movieResult.overview : 'No description available.'}</p>
            </div>
          </div>
        `;
      } else {
        // No movie result found. Try to find a person result.
        const personResult = data.results.find(item => item.media_type === 'person');

        if (personResult) {
          // Fetch this actor's movie credits
          fetch(`https://api.themoviedb.org/3/person/${personResult.id}/movie_credits?api_key=${apiKey}`)
            .then(response => response.json())
            .then(creditsData => {
              const movies = creditsData.cast;
              if (!movies || movies.length === 0) {
                movieContainer.innerHTML = `<p class="error-message">No movies found for this actor.</p>`;
                return;
              }

              // Create a grid layout for the actor's movies
              const grid = document.createElement('div');
              grid.classList.add('movies-grid');

              movies.forEach(movie => {
                const posterPath = movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : 'https://via.placeholder.com/300x450?text=No+Poster';

                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.innerHTML = `
                  <img class="movie-poster" src="${posterPath}" alt="${movie.title} Poster">
                  <div class="movie-info">
                    <h2>${movie.title} (${movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'})</h2>
                    <p>${movie.overview ? movie.overview.substring(0, 80) + '...' : 'No description available.'}</p>
                  </div>
                `;
                grid.appendChild(movieCard);
              });

              movieContainer.appendChild(grid);
            })
            .catch(error => {
              console.error('Error fetching credits:', error);
              movieContainer.innerHTML = `<p class="error-message">An error occurred. Please try again.</p>`;
            });
        } else {
          movieContainer.innerHTML = `<p class="error-message">No movie or actor found with that name.</p>`;
        }
      }
    })
    .catch(error => {
      console.error('Error during multi-search:', error);
      movieContainer.innerHTML = `<p class="error-message">An error occurred. Please try again.</p>`;
    });
});
