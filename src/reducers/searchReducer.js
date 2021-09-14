const initState = { searchedMovies: [], title: '', year: '', searchBy: '', length: 0 };

const searchReducer = (state=initState, action) => {
    switch (action.type) {
        case 'FETCH_SEARCH_TITLE':
            return {
                ...state,
                searchedMovies: action.payload.searchedMovies,
                title: action.payload.title,
                searchBy: action.payload.searchBy,
                length: action.payload.length,
            };
        case 'FETCH_SEARCH_YEAR':
            return {
                ...state,
                searchedMovies: action.payload.searchedMovies,
                year: action.payload.year,
                searchBy: action.payload.searchBy,
                length: action.payload.length,
            };
        case 'FETCH_SEARCH_BOTH':
            return {
                ...state,
                searchedMovies: action.payload.searchedMovies,
                title: action.payload.title,
                year: action.payload.year,
                searchBy: action.payload.searchBy,
                length: action.payload.length,
            };
        default:
            return { ...state };
    }
}

export default searchReducer;
