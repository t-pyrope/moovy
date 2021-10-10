import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useQuery from '../helpers/useQuery';

import MoviesContainer from '../components/MoviesContainer';
import ScrollTop from '../components/ScrollTop';

const RatedMoviesPage = () => {
    // displayed 10 movies per page
    const [displayMovies, setDisplayMovies] = useState([]);
    // all movies of specific chosen genres
    const [filteredMovies, setFilteredMovies] = useState([]);

    const [activeGenres, setActiveGenres] = useState([]);
    const [activeRatings, setActiveRatings] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);

    // button "Show more"
    const [isDisabled, setIsDisabled] = useState(false);
    const { ratedMovies, genres, ratings } = useSelector(state => state.rated);
    const limit = 10;
    const { url } = useRouteMatch();
    const history = useHistory();
    const query = useQuery();

    useEffect(() => {
        if (!ratedMovies.length) {
            history.replace(`/rated`);
        } else {
            history.push(`/rated?page=${page}`)
        }
    }, [ratedMovies.length, history, url, page])

    useEffect(() => {
        // set number of pages, when filteredMovies change
        if (filteredMovies.length) {
            setCount(Math.ceil(filteredMovies.length / limit));
        } else if (ratedMovies.length) {
            setCount(Math.ceil(ratedMovies.length / limit))
        }
    }, [filteredMovies.length, ratedMovies.length]);

    useEffect(() => {
        // setting display and filtered movies
        let movies = [...ratedMovies];
        if (activeGenres.length) {
            // filter movies for that genres
            movies = movies
                .filter(m => {
                    let ok = true;
                    for (let value of activeGenres) {
                        if (!m.genres.includes(value)) ok = false;
                    }
                    return ok;
                })
        }
        if (activeRatings.length) {
            movies = movies.filter(m => activeRatings.includes(m.rating))
        }
        if (movies.length === ratedMovies.length) {
            // do nothing
            if (filteredMovies.length) setFilteredMovies([]);
        } else {
            setFilteredMovies(movies);
        }
        setDisplayMovies(movies.slice((page - 1) * limit, page * limit));
    }, [activeGenres, page, ratedMovies, activeRatings, filteredMovies.length])

    useEffect(() => {
        let allMovies = filteredMovies.length ? [...filteredMovies] : [...ratedMovies];
        if (allMovies.length <= (((page-1)*10) + displayMovies.length)) {
            setIsDisabled(true)
        } else if (isDisabled === true){
            setIsDisabled(false)
        }
    }, [displayMovies.length, filteredMovies, isDisabled, page, ratedMovies])

    const onPaginationChange = (e, p) => {
        setPage(p);
    }

    const onChipClick = (genre) => {
        let set = new Set(activeGenres);
        set.has(genre) ? set.delete(genre) : set.add(genre);
        setActiveGenres(Array.from(set));
        setPage(1);
    }

    const onRatingChipClick = (rating) => {
        let set = new Set(activeRatings);
        set.has(rating) ? set.delete(rating) : set.add(rating);
        setActiveRatings(Array.from(set));
        setPage(1);
    }

    const downloadMore = () => {
        let allMovies = filteredMovies.length ? [...filteredMovies] : [...ratedMovies];
        let nextMovies = allMovies.slice(displayMovies.length - 1, displayMovies.length + 9);
        setDisplayMovies([...displayMovies, ...nextMovies]);
    }
    
    return(
        <>
            <h2>Rated by me</h2>
            {
                query.get('page')
                    ? <MoviesContainer
                            movies={displayMovies}
                            activeGenres={activeGenres}
                            genres={genres}
                            count={count}
                            onChipClick={onChipClick}
                            onPaginationChange={onPaginationChange}
                            ratings={ratings}
                            activeRatings={activeRatings}
                            onRatingChipClick={onRatingChipClick}
                            page={page}
                            downloadMore={downloadMore}
                            showMoreDisabled={isDisabled}
                        /> 
                    : <p style={{ marginTop: "1rem" }}>You haven't rated any movie yet</p>
            }
            <ScrollTop />
        </>
    )
}

export default RatedMoviesPage;
