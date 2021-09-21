const initState = {
    searchedMovies: [],
    title: '',
    year: '',
    page: 1,
    searchBy: '',
    length: 0,
    errorMessage: ''
};

const searchReducer = (state=initState, action) => {
    let searchedMovies = action.payload?.searchedMovies ?? [];
    let title = action.payload?.title;
    let page = action.payload?.page;
    let searchBy = action.payload?.searchBy;
    let length = action.payload?.length;
    switch (action.type) {
        case 'FETCH_SEARCH_TITLE':
            return {
                ...state,
                searchedMovies, title, page, searchBy, length,
                errorMessage: !searchedMovies.length
                    ? `Couldn't find anything for ${action.payload.title}`
                    : '',
            };
        case 'FETCH_SEARCH_BOTH':
            const year = action.payload.year;
            return {
                ...state,
                searchedMovies, title, page, searchBy, length, year,
                errorMessage: !searchedMovies.length
                    ? `Couldn't find anything for ${title}, ${year}`
                    : '',
            };
        default:
            return { ...state };
    }
}

export default searchReducer;
