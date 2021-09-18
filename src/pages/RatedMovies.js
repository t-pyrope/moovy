import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import fetchDetail from '../actions/detailAction';

import { ImageList } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import Card from '../components/Card';
import FilterPanel from '../components/FilterPanel';

const RatedMovies = () => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [displayMovies, setDisplayMovies] = useState([]);
    const { ratedMovies, genres } = useSelector(state => state.rated);
    const limit = 10;
    const history = useHistory();
    const dispatch = useDispatch();

    // for filter panel
    const [activeGenres, setActiveGenres] = useState([]);

    useEffect(() => {
        setCount(Math.ceil(ratedMovies?.length / limit))
    }, [count, ratedMovies, limit])

    useEffect(() => {
        let movies = ratedMovies.slice((page - 1) * limit, page * limit);
        setDisplayMovies(movies);
    }, [page, ratedMovies]);

    useEffect(() => {
        let movies = ratedMovies
            .filter(m => {
                let ok = true;
                for (let value of activeGenres) {
                    if (!m.genres.includes(value)) ok = false;
                }
                return ok;
            })
            .slice((page - 1) * limit, page * limit);
        setDisplayMovies(movies);
    }, [activeGenres, page, ratedMovies])

    const onClick = id => {
        dispatch(fetchDetail(id));
        history.push(`/movie/${id}`);
    }

    const onPaginationChange = (e, p) => {
        setPage(p);
    }

    const onChipClick = (genre) => {
        let set = new Set(activeGenres);
        set.has(genre) ? set.delete(genre) : set.add(genre);
        setActiveGenres(Array.from(set));
    }
    
    return(
        <>
            <h2>Rated by me</h2>
            {ratedMovies?.length ?
                <div className="container_flex container_flex_column container_flex_column_center">
                    <FilterPanel
                        genres={genres}
                        activeGenres={activeGenres}
                        onChipClick={onChipClick}
                    />
                    <Pagination
                        count={count}
                        page={page}
                        onChange={onPaginationChange}
                        size="large"
                    />
                    <ImageList style={{ gap: "1rem", justifyContent: "center" }}>
                        {displayMovies.length ? displayMovies.map(m =>
                                <Card
                                    key={m.id}
                                    id={m.id}
                                    title={m.title}
                                    poster={m.posterUrl}
                                    onClick={onClick}
                                />
                            ) : ''}
                    </ImageList>
                    <Pagination
                        count={count}
                        page={page}
                        onChange={onPaginationChange}
                        size="large"
                    />
                </div>
            : <p style={{ marginTop: "1rem" }}>You haven't rated any movie yet</p> }
        </>
    )
}

export default RatedMovies;
