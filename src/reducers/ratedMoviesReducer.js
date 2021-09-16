const initState = { ratedMovies: [], genres: [] };

const ratedMoviesReducer = (state=initState, action) => {
    switch(action.type) {
        case "ADD_RATING":
            let movie = state.ratedMovies.find(m => m.id === action.payload.id);
            let newGenres = [...state.genres];
            for (let genre of action.payload.genres) {
                if (!newGenres.includes(genre)) newGenres.push(genre);
            }
            if (movie) {
                let newRatedMovies = state.ratedMovies.filter(m => m.id !== action.payload.id);
                newRatedMovies.push({
                    id: action.payload.id,
                    rating: action.payload.rating,
                    posterUrl: action.payload.posterUrl,
                    title: action.payload.title,
                });
                return { ...state, ratedMovies: newRatedMovies, genres: newGenres }
            } else {
                let newRatedMovies = [...state.ratedMovies];
                newRatedMovies.push({
                    id: action.payload.id,
                    rating: action.payload.rating,
                    posterUrl: action.payload.posterUrl,
                    title: action.payload.title,
                });
                return { ...state, ratedMovies: newRatedMovies, genres: newGenres }
            }
        default:
            return { ...state }
    }
}

export default ratedMoviesReducer;
