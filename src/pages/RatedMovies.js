import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import fetchDetail from '../actions/detailAction';

import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const RatedMovies = () => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [displayMovies, setDisplayMovies] = useState([]);
    const { ratedMovies } = useSelector(state => state.rated);
    const limit = 10;
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setCount(Math.ceil(ratedMovies?.length / limit))
    }, [count, ratedMovies, limit])

    useEffect(() => {
        let movies = ratedMovies.slice((page - 1) * limit, page * limit);
        setDisplayMovies(movies);
    }, [page, ratedMovies]);

    const onClick = id => {
        dispatch(fetchDetail(id));
        history.push(`/movie/${id}`);
    }

    const onPaginationChange = (e, p) => {
        setPage(p);
    }
    
    return(
        <>
            <h2>Rated by me</h2>
            {ratedMovies?.length ?
                <div className="container_flex container_flex_column container_flex_column_center">
                    <Pagination
                        count={count}
                        page={page}
                        onChange={onPaginationChange}
                        size="large"
                    />
                    <ImageList gap={20}>
                        {displayMovies.length ? displayMovies.map(m =>
                                    <ImageListItem
                                        key={m.id}
                                        style={{ width: "250px", height: "360px" }}
                                        onClick={() => onClick(m.id)}
                                    >
                                        <img src={m.posterUrl} alt={m.title} />
                                        <ImageListItemBar title={m.title}>

                                        </ImageListItemBar>
                                    </ImageListItem>
                                ) : ''}
                    </ImageList>
                </div>
            : <p style={{ marginTop: "1rem" }}>You haven't rated any movie yet</p> }
        </>
    )
}

export default RatedMovies;
