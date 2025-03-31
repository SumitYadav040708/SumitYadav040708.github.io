document.getElementById('searchBtn').addEventListener('click', function() {
  const query = document.getElementById('searchInput').value.trim();

  // Clear previous results
  const movieContainer = document.getElementById('movieContainer');
  movieContainer.innerHTML = '';

  // If user didn't type anything, exit the function
  if (!query) return;

  // Replace 'YOUR_API_KEY' with your actual OMDb API key
  fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=YOUR_API_KEY`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "False") {
        // Movie not found
        movieContainer.innerHTML = `<p class="error-message">Movie not found. Please try again.</p>`;
        return;
      }
      
      // If found, create a movie card
      const poster = data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/400x600?text=No+Poster';
      
      movieContainer.innerHTML = `
        <div class="movie">
          <img src="${poster}" alt="${data.Title} Poster">
          <div class="movie-details">
            <h2>${data.Title} (${data.Year})</h2>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
          </div>
        </div>
      `;
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
      movieContainer.innerHTML = `<p class="error-message">An error occurred. Please try again.</p>`;
    });
});
