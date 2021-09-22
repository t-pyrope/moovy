import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MoviesContainer from '../components/MoviesContainer';
import ScrollTop from '../components/ScrollTop';

const RatedMoviesPage = () => {
    // displayed 10 movies per page
    const [displayMovies, setDisplayMovies] = useState([]);
    // all movies of specific chosen genres
    const [genreMovies, setGenreMovies] = useState([]);

    const [filterPanel, setFilterPanel] = useState({genres: [], activeGenres: []});
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const { ratedMovies, genres } = useSelector(state => state.rated);
    const limit = 10;
    const { path, url } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        setFilterPanel({...filterPanel, genres})
    
        if (ratedMovies.length) {
            setCount(Math.ceil(ratedMovies.length / limit))
        }
    
        const pageUrl = window.location.pathname;
        if (!ratedMovies.length && (pageUrl !== "/rated")) {
            history.push(url);
        }
    }, [])

    useEffect(() => {
        if (!ratedMovies.length) return;
        let moviesCount;
        if (genreMovies.length) {
            moviesCount = Math.ceil(genreMovies.length / limit)
        } else {
            moviesCount = Math.ceil(ratedMovies.length / limit)
        }
        setCount(moviesCount)
    }, [genreMovies.length])

    useEffect(() => {
        if (!ratedMovies.length) return;
        let movies = ratedMovies.slice((page - 1) * limit, page * limit);
        setDisplayMovies(movies);
        history.push(`${url}/${page}`);
    }, [page]);

    useEffect(() => {
        let movies = ratedMovies
            .filter(m => {
                let ok = true;
                for (let value of filterPanel.activeGenres) {
                    if (!m.genres.includes(value)) ok = false;
                }
                return ok;
            })
        if (movies.length === ratedMovies.length) {
            setGenreMovies([])
        } else {
            setGenreMovies(movies);
        }
        setDisplayMovies(movies.slice((page - 1) * limit, page * limit));
    }, [filterPanel.activeGenres])

    const onPaginationChange = (e, p) => {
        setPage(p);
    }

    const onChipClick = (genre) => {
        let set = new Set(filterPanel.activeGenres);
        set.has(genre) ? set.delete(genre) : set.add(genre);
        setFilterPanel({...filterPanel, activeGenres: Array.from(set)});
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
                        filterPanel={filterPanel}
                        count={count}
                        onChipClick={onChipClick}
                        onPaginationChange={onPaginationChange}
                    />}
                />
            </Switch>
            <ScrollTop />
        </>
    )
}

export default RatedMoviesPage;
