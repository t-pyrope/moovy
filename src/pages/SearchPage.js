import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTitleSearch, fetchYearSearch, fetchBothSearch } from '../actions/searchAction';

import { ImageList } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import Card from '../components/Card';

const SearchPage = () => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const {
        searchedMovies, title, year,
        searchBy, length, initial
    } = useSelector(state => state.search);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setCount(Math.ceil(length / 10))
    }, [setCount, length])

    const onClick = id => {
        history.push(`/movie/${id}`);
    }

    const onPaginationChange = (e, p) => {
        switch(searchBy) {
            case 'searchByTitle':
                dispatch(fetchTitleSearch(title, p));
                break;
            case 'searchByYear':
                dispatch(fetchYearSearch(year, p));
                break;
            case 'searchByBoth':
                dispatch(fetchBothSearch(title, year, p));
                break;
            default:
                return;
        }
        setPage(p);
    }

    

    return (
        <>
            { initial ? 'Nothing to display. Try to search something!'
                : <div className="container_flex container_flex_column container_flex_column_center"> 
                    { searchedMovies?.length ?
                        <>
                            <Pagination
                                count={count}
                                page={page}
                                onChange={onPaginationChange}
                                size="large"
                            />
                            <ImageList style={{ gap: "1rem", justifyContent: "center" }}>
                                {searchedMovies.length ? searchedMovies.map(m =>
                                            <Card
                                                key={m.imdbID}
                                                id={m.imdbID}
                                                title={m.Title}
                                                poster={m.Poster}
                                                onClick={onClick}
                                            />
                                        ) : ''}
                            </ImageList>
                            <Pagination
                                count={count}
                                page={page}
                                onChange={onPaginationChange}
                                size="large"
                            /></> : "Couldn't find anything"
                    }
                </div>
            }
        </>
    )
}

export default SearchPage;
