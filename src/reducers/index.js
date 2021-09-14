import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import detailReducer from "./detailReducer";
import ratedMoviesReducer from "./ratedMoviesReducer";

const rootReducer = combineReducers({
    search: searchReducer,
    detail: detailReducer,
    rated: ratedMoviesReducer,
})

export default rootReducer;
