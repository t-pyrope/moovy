import axios from "axios";
import { titleSearchURL, titleYearSearchURL } from "../api";

export const fetchTitleSearch = (title, page) => async (dispatch) => {
    await axios.get(titleSearchURL(title, page))
        .then(res => {
            dispatch({
                type: 'FETCH_SEARCH_TITLE',
                payload: {
                    searchedMovies: res.data.Search,
                    title, page,
                    searchBy: 'searchByTitle',
                    length: res.data.totalResults,
                }
            })
        }).catch(e => console.error(e));
}

export const fetchBothSearch = (title, year, page) => async(dispatch) => {
    await axios.get(titleYearSearchURL(title, year, page))
        .then(res => {
            dispatch({
                type: "FETCH_SEARCH_BOTH",
                payload: {
                    searchedMovies: res.data.Search,
                    title, year, page,
                    searchBy: 'searchByBoth',
                    length: res.data.totalResults,
                }
            })
        }).catch(e => console.error(e));
}
