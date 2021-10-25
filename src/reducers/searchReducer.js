import {
    FETCH_SEARCH_TITLE, FETCH_SEARCH_BOTH, FETCH_MORE
} from '../actions/types'

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
    switch (action.type) {
        case FETCH_SEARCH_TITLE:
            return {
                ...state,
                searchedMovies: action.payload.searchedMovies ?? [],
                title: action.payload.title,
                page: action.payload.page,
                year: "",
                searchBy: action.payload.searchBy,
                length: action.payload.length ?? '',
                errorMessage: !action.payload.searchedMovies
                    ? `Couldn't find anything for `
                    : '',
            };
        case FETCH_SEARCH_BOTH:
            return {
                ...state,
                searchedMovies: action.payload.searchedMovies ?? [],
                title: action.payload.title,
                page: action.payload.page,
                searchBy: action.payload.searchBy,
                length: action.payload.length ?? '',
                year: action.payload.year,
                errorMessage: !action.payload.searchedMovies
                    ? `Couldn't find anything for `
                    : '',
            };
        case FETCH_MORE:
            return {
                ...state,
                searchedMovies: [...state.searchedMovies, ...action.payload.searchedMovies]
            };
        default:
            return { ...state };
    }
}

export default searchReducer;
