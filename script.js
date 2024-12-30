const apiKey = "57e77e7f90787e50a9257f3d576cce14"; // Substitua pela sua chave da API
const movieId = "939243"; // Substitua pelo ID do filme desejado

async function fetchMovie() {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro ao buscar informações do filme.");
        }
        const movie = await response.json();
        displayMovie(movie);
    } catch (error) {
        const movieContainer = document.getElementById("movieContainer");
        movieContainer.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayMovie(movie) {
    const movieContainer = document.getElementById("movieContainer");

    // Verifica se há um poster_path disponível
    const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=Sem+Imagem"; // Imagem genérica caso não exista pôster

    // Adiciona imagem e título com link para a página de detalhes
    movieContainer.innerHTML = `
        <div class="movie-card">
            <img src="${posterPath}" alt="${movie.title}">
            <a href="details.html?id=939243${movie.id}">${movie.title}</a>
        </div>
    `;
}

// Chama a função automaticamente ao carregar a página
window.onload = fetchMovie;
