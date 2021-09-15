const initState = {
    searchedMovies: [],
    title: '',
    year: '',
    page: 1,
    searchBy: '',
    length: 0,
    initial: true,
};

const searchReducer = (state=initState, action) => {
    switch (action.type) {
        case 'FETCH_SEARCH_TITLE':
            return {
                ...state,
                searchedMovies: action.payload.searchedMovies,
                title: action.payload.title,
                page: action.payload.page,
                searchBy: action.payload.searchBy,
                length: action.payload.length,
                initial: false,
            };
        case 'FETCH_SEARCH_YEAR':
            return {
                ...state,
                searchedMovies: action.payload.searchedMovies,
                year: action.payload.year,
                page: action.payload.page,
                searchBy: action.payload.searchBy,
                length: action.payload.length,
                initial: false,
            };
        case 'FETCH_SEARCH_BOTH':
            return {
                ...state,
                searchedMovies: action.payload.searchedMovies,
                title: action.payload.title,
                year: action.payload.year,
                page: action.payload.page,
                searchBy: action.payload.searchBy,
                length: action.payload.length,
                initial: false,
            };
        default:
            return { ...state };
    }
}

export default searchReducer;
