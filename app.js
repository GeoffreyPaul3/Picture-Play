const API_KEY = 'd0c45351';
const API_URL = ' http://www.omdbapi.com/?i=tt3896198&apikey=d0c45351';

const searchButton = document.getElementById("#search-button");
const searchForm = document.getElementById("#search-form");
const searchInput = document.getElementById("#search-input");
const spinner = document.getElementById("#spinner");
const resultsContainer = document.getElementById("#results-container");

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  searchMovies();
});

searchButton.addEventListener("click", function() {
  searchMovies();
});

function searchMovies() {
  const searchTerm = searchInput.value;
  if (searchTerm) {
    spinner.classList.remove("d-none");
    resultsContainer.innerHTML = "";
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=YOUR_API_KEY`)
      .then(response => response.json())
      .then(data => {
        if (data.Search) {
          data.Search.forEach(movie => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");
            movieElement.innerHTML = `
              <img src="${movie.Poster}">
              <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
              </div>
            `;
            resultsContainer.appendChild(movieElement);
          });
        } else {
          resultsContainer.innerHTML = "<p>No results found</p>";
        }
        spinner.classList.add("d-none");
      })
      .catch(error => {
        console.error("Error:", error);
        resultsContainer.innerHTML = "<p>An error occurred, please try again</p>";
        spinner.classList.add("d-none");
      });
  }
}
