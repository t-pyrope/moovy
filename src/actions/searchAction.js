import axios from "axios";
import { titleSearchURL, titleYearSearchURL } from "../api";
import {
    FETCH_SEARCH_TITLE, FETCH_SEARCH_BOTH, FETCH_MORE,
} from "./types";

export const fetchTitleSearch = (title, page) => async (dispatch) => {
    await axios.get(titleSearchURL(title, page))
        .then(res => {
            dispatch({
                type: FETCH_SEARCH_TITLE,
                payload: {
                    searchedMovies: res.data.Search,
                    title, page,
                    searchBy: 'searchByTitle',
                    length: res.data.totalResults,
                }
            })
        }).catch(e => console.error(e)); // eslint-disable-line no-console
}

export const fetchBothSearch = (title, year, page) => async(dispatch) => {
    await axios.get(titleYearSearchURL(title, year, page))
        .then(res => {
            dispatch({
                type: FETCH_SEARCH_BOTH,
                payload: {
                    searchedMovies: res.data.Search,
                    title, year, page,
                    searchBy: 'searchByBoth',
                    length: res.data.totalResults,
                }
            })
        }).catch(e => console.error(e)); // eslint-disable-line no-console
}

export const fetchMoreTitle = (title, page, length) => async(dispatch) => {
    let pageToLoad = Math.trunc(page + length / 10);
    await axios.get(titleSearchURL(title, pageToLoad))
        .then(res => {
            dispatch({
                type: FETCH_MORE,
                payload: {
                    searchedMovies: res.data.Search,
                }
            })
        // eslint-disable-next-line no-console
        }).catch(e => console.error(e));
}

export const fetchMoreBoth = (title, year, page, length) => async(dispatch) => {
    let pageToLoad = Math.trunc(page + length / 10);
    await axios.get(titleYearSearchURL(title, year, pageToLoad))
        .then(res => {
            dispatch({
                type: FETCH_MORE,
                payload: {
                    searchedMovies: res.data.Search,
                }
            })
        // eslint-disable-next-line no-console
        }).catch(e => console.error(e));
}
