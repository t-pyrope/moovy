import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MoviesContainer from '../components/MoviesContainer';

const RatedMoviesPage = () => {
    // displayed 10 movies per page
    const [displayMovies, setDisplayMovies] = useState([]);
    // all movies of specific chosen genres
    const [genreMovies, setGenreMovies] = useState([]);
    const [filterPanel, setFilterPanel] = useState({genres: [], activeGenres: []});
    const [pagination, setPagination] = useState({count: 0, page: 1});
    const { ratedMovies, genres } = useSelector(state => state.rated);
    const limit = 10;
    const { path, url } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        if (ratedMovies.length) {
            history.push(`${url}/${pagination.page}`);
            setPagination({...pagination, count: Math.ceil(ratedMovies.length / limit)})
        }
    }, [])

    useEffect(() => {
        let count;
        if (genreMovies.length) {
            count = Math.ceil(genreMovies.length / limit)
        } else {
            count = Math.ceil(ratedMovies.length / limit)
        }
        setPagination({ ...pagination, count })
    }, [genreMovies.length])

    useEffect(() => {
        setFilterPanel({...filterPanel, genres})
    }, [])

    useEffect(() => {
        let movies = ratedMovies.slice((pagination.page - 1) * limit, pagination.page * limit);
        setDisplayMovies(movies);
    }, [pagination.page]);

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
        setDisplayMovies(movies.slice((pagination.page - 1) * limit, pagination.page * limit));
    }, [filterPanel.activeGenres, pagination.page])

    const onPaginationChange = (e, p) => {
        setPagination({...pagination, page: p});
    }

    const onChipClick = (genre) => {
        let set = new Set(filterPanel.activeGenres);
        set.has(genre) ? set.delete(genre) : set.add(genre);
        setFilterPanel({...filterPanel, activeGenres: Array.from(set)});
        setPagination({...pagination, page: 1});
    }
    
    return(
        <>
            <h2>Rated by me</h2>
            <Switch>
                <Route path={path} exact>
                    <p style={{ marginTop: "1rem" }}>You haven't rated any movie yet</p>
                </Route>
                <Route path={`${path}/:${pagination.page}`}>
                    <MoviesContainer
                        movies={displayMovies}
                        filterPanel={filterPanel}
                        pagination={pagination}
                        onChipClick={onChipClick}
                        onPaginationChange={onPaginationChange}
                    />
                </Route>
            </Switch>
        </>
    )
}

export default RatedMoviesPage;
