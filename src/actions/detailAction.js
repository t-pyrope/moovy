import axios from 'axios';
import { movieDetailURL } from '../api';
import {
    FETCH_DETAIL, LOADING_DETAIL,
} from './types';

const fetchDetail = id => async (dispatch) => {
    dispatch({ type: LOADING_DETAIL });

    await axios.get(movieDetailURL(id))
        .then(res => {
            dispatch({
                type: FETCH_DETAIL,
                payload: {
                    title: res.data.Title,
                    year: res.data.Year,
                    genre: res.data.Genre,
                    posterUrl: res.data.Poster,
                    imdbRating: res.data.imdbRating,
                    plot: res.data.Plot,
                    actors: res.data.Actors,
                    id: id,
                }
            })
        // eslint-disable-next-line no-console
        }).catch(e => console.error(e));
}

export default fetchDetail;

