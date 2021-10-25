import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';
import addRating from '../actions/ratingAction';
import fetchDetail from '../actions/detailAction';

import { ImageListItem, ImageListItemBar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import noPoster from '../assets/img/no-poster.png';

const Card = ({ poster, title, id }) => {
    const [myRating, setMyRating] = useState(0);
    const { ratedMovies } = useSelector(state => state.rated);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const myRatingMovie = ratedMovies.find(m => m.imdbID === id);
        if (myRatingMovie) {
            setMyRating(+myRatingMovie.rating);
        }
    }, [ratedMovies, id])

    const onChange = (e) => {
        setMyRating(+e.target.value);
        dispatch(addRating(id, +e.target.value, poster, title))
    }

    const onClick = () => {
        dispatch(fetchDetail(id));
        history.push(`/movie/${id}`);
    }

    return(
        <ImageListItem
        >
            <img
                src={poster === "N/A" ? noPoster : poster}
                alt={title}
                onClick={onClick}
                className="image_grid-item"
            />
            <ImageListItemBar
                title={title}
                subtitle={
                    <Rating
                        name={id}
                        value={myRating}
                        onChange={onChange}
                        size="small"
                    />
                }
            >
            </ImageListItemBar>
        </ImageListItem>
    )
}

export default Card;
