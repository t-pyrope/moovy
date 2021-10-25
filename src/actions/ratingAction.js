import axios from 'axios';
import { movieDetailURL } from '../api';
import { ADD_RATING } from './types';

const addRating = (id, rating, posterUrl, title) => async (dispatch) => {
    return await axios.get(movieDetailURL(id)).then(res => {
        dispatch({
            type: ADD_RATING,
            payload: {
                id, rating, posterUrl, title, genres: res.data.Genre
            }
        })
    }).catch(e => console.error(e)); // eslint-disable-line no-console
}

export default addRating;
