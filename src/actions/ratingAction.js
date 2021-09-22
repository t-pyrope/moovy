import axios from 'axios';
import { movieDetailURL } from '../api';

const addRating = (id, rating, posterUrl, title) => async (dispatch) => {
    await axios.get(movieDetailURL(id)).then(res => {
        let genres = res.data.Genre?.split(", ");
        dispatch({
            type: "ADD_RATING",
            payload: {
                id, rating, posterUrl, title, genres
            }
        })
    }).catch(e => console.error(e)); // eslint-disable-line no-console
}

export default addRating;
