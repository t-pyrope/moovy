import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import fetchDetail from '../actions/detailAction';
import addRating from '../actions/ratingAction';

import { Rating } from '@material-ui/lab';
import { Button } from '@material-ui/core';

import noPoster from '../assets/img/no-poster.png';

const MovieDetails = () => {
    const { ratedMovies } = useSelector(state => state.rated);

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.split("/")[2];
    const [myRating, setMyRating] = useState(0);

    useEffect(() => {
        dispatch(fetchDetail(id));
    }, [dispatch, id]);

    const {
        title, year, genre, posterUrl,
        imdbRating, plot, actors, isLoading,
    } = useSelector(state => state.detail);
        
    useEffect(() => {
        const myRatingMovie = ratedMovies.find(m => m.imdbID === id);
        if (myRatingMovie) {
            setMyRating(myRatingMovie.rating);
        }
    }, [ratedMovies, id])

    const onChange = (e) => {
        dispatch(addRating(id, +e.target.value, posterUrl, title))
    }

    return(
        <>{!isLoading ?
            <>
                <Button onClick={() => history.goBack()}>Go back</Button>
                <div className="container_flex">
                    <img
                        src={posterUrl === "N/A" ? noPoster : posterUrl}
                        style={{ maxWidth: "300px" }}
                        alt={title}
                    />
                    <div className="container_flex container_flex_column">
                        <h2>{title}</h2>
                        <p>{year}</p>
                        <p><span className="bold">Actors:</span> {actors}</p>
                        <p><span className="bold">Genre:</span> {genre}</p>
                        <p><span className="bold">IMDB rating:</span> {imdbRating}</p>
                        <p>
                            My rating:
                            <Rating
                                name="size-small"
                                value={myRating}
                                onChange={(e) => onChange(e)}
                                size="small"
                            />
                            </p>
                        <p>{plot}</p>
                    </div>
                </div>
            </> : '' }
        </>
    )
}

export default MovieDetails;
