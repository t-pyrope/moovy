import {
    LOADING_DETAIL, FETCH_DETAIL,
} from "../actions/types";

const initState = {
    title: '',
    year: '',
    genre: '',
    posterUrl: '',
    imdbRating: '',
    plot: '',
    actors: '',
    id: '',
    isLoading: false,
}

const detailReducer = (state=initState, action) => {
    switch(action.type) {
        case LOADING_DETAIL:
            return {...state, isLoading: true};
        case FETCH_DETAIL:
            return {
                ...state,
                title: action.payload.title,
                year: action.payload.year,
                genre: action.payload.genre,
                posterUrl: action.payload.posterUrl,
                imdbRating: action.payload.imdbRating,
                plot: action.payload.plot,
                actors: action.payload.actors,
                id: action.payload.id,
                isLoading: false,
            };
        default:
            return { ...state }
    }
}

export default detailReducer;
