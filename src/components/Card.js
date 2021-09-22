import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import addRating from '../actions/ratingAction';

import { ImageListItem, ImageListItemBar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import noPoster from '../assets/img/no-poster.png';

const Card = ({ poster, title, onClick, id }) => {
    const [myRating, setMyRating] = useState(0);
    const { ratedMovies } = useSelector(state => state.rated);
    const dispatch = useDispatch();

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

    return(
        <ImageListItem
            style={{ width: "250px", height: "360px" }}
        >
            <img
                src={poster === "N/A" ? noPoster : poster}
                alt={title}
                onClick={() => onClick(id)}
            />
            <ImageListItemBar
                title={title}
                subtitle={
                    <Rating
                        name={id}
                        value={myRating}
                        onChange={(e) => onChange(e)}
                        size="small"
                    />
                }
            >

            </ImageListItemBar>
        </ImageListItem>
    )
}

export default Card;
