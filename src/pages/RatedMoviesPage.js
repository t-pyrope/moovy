import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    const { ratedMovies, genres, ratings } = useSelector(state => state.rated);
    const limit = 10;
    const { path, url } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {    
        // if there is no movies, make sure the url is /rated
        const pageUrl = window.location.pathname;
        if (!ratedMovies.length && (pageUrl !== "/rated")) {
            history.push(url);
        }
    }, [ratedMovies.length, history, url])

    useEffect(() => {
        // set number of pages, when filteredMovies change
        if (filteredMovies.length) {
            setCount(Math.ceil(filteredMovies.length / limit));
        } else if (ratedMovies.length) {
            setCount(Math.ceil(ratedMovies.length / limit))
        }
    }, [filteredMovies.length, ratedMovies.length]);

    useEffect(() => {
        // setting display movies
        if (ratedMovies.length) {
            let movies = ratedMovies.slice((page - 1) * limit, page * limit);
            setDisplayMovies(movies);
        }
    }, [ratedMovies, page]);

    useEffect(() => {
        history.push(`${url}/${page}`);
    }, [history, url, page]);

    useEffect(() => {
        // setting display movies
        let movies = [...ratedMovies];
        // if there are some genres for filter chosen
        if (ratedMovies.length) {
            movies = ratedMovies.slice((page - 1) * limit, page * limit);
        }
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
            // if all movies are of chosen genres
            if (movies.length === ratedMovies.length) {
                // do nothing
                setFilteredMovies([]);
                setDisplayMovies(movies.slice((page - 1) * limit, page * limit));
            }
        }
        if (activeRatings.length) {
            movies = movies.filter(m => {
                let ok = true;
                for (let value of activeRatings) {
                    if (!(m.rating === value)) ok = false;
                }
                return ok;
            })
        }
        setFilteredMovies(movies);
        setDisplayMovies(movies);
    }, [activeGenres, page, ratedMovies, activeRatings])

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
    
    return(
        <>
            <h2>Rated by me</h2>
            <Switch>
                <Route
                    path={path}
                    render={() => <p style={{ marginTop: "1rem" }}>You haven't rated any movie yet</p>}
                    exact
                />
                <Route
                    path={`${path}/:pageId`}
                    render={() => <MoviesContainer
                        movies={displayMovies}
                        activeGenres={activeGenres}
                        genres={genres}
                        count={count}
                        onChipClick={onChipClick}
                        onPaginationChange={onPaginationChange}
                        ratings={ratings}
                        activeRatings={activeRatings}
                        onRatingChipClick={onRatingChipClick}
                    />}
                />
            </Switch>
            <ScrollTop />
        </>
    )
}

export default RatedMoviesPage;
