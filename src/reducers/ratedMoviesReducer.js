const initState = { ratedMovies: [], genres: [], ratings: [] };

const ratedMoviesReducer = (state=initState, action) => {
    switch(action.type) {
        case "ADD_RATING":
            let newGenres = new Set(state.genres);
            for (let genre of action.payload.genres) {
                newGenres.add(genre);
            }

            let movie = state.ratedMovies.find(m => m.imdbID === action.payload.id);
            let newRatedMovies;
            if (movie) {
                newRatedMovies = state.ratedMovies.filter(m => m.imdbID !== action.payload.id);
            } else {
                newRatedMovies = [...state.ratedMovies];
            }
            newRatedMovies.push({
                imdbID: action.payload.id,
                rating: action.payload.rating,
                Poster: action.payload.posterUrl,
                Title: action.payload.title,
                genres: action.payload.genres
            });

            let newRatings = new Set();
            for (let movie of newRatedMovies) {
                newRatings.add(movie.rating)
            }

            return {
                ...state,
                ratedMovies: newRatedMovies,
                genres: Array.from(newGenres),
                ratings: Array.from(newRatings),
            }
        default:
            return { ...state }
    }
}

export default ratedMoviesReducer;
