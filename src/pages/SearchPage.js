import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import noPoster from '../assets/img/no-poster.png';
import SearchComponent from '../components/SearchComponent';
import { fetchTitleSearch, fetchYearSearch, fetchBothSearch } from '../actions/searchAction';

const SearchPage = () => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { searchedMovies, title, year, searchBy, length } = useSelector(state => state.search);
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
            { searchedMovies?.length ?
                <div className="container_flex container_flex_column container_flex_column_center">
                    <SearchComponent extended={true} page={page} />
                    <Pagination
                        count={count}
                        page={page}
                        onChange={onPaginationChange}
                        size="large"
                    />
                    <ImageList gap={20}>
                        {searchedMovies.length ? searchedMovies.map(m =>
                                    <ImageListItem
                                        key={m.imdbID}
                                        style={{ width: "250px", height: "360px" }}
                                        onClick={() => onClick(m.imdbID)}
                                    >
                                        <img
                                            src={m.Poster === "N/A" ? noPoster : m.Poster}
                                            alt={m.Title}
                                        />
                                        <ImageListItemBar title={m.Title}>

                                        </ImageListItemBar>
                                    </ImageListItem>
                                ) : ''}
                    </ImageList>
                    <Pagination
                        count={count}
                        page={page}
                        onChange={onPaginationChange}
                        size="large"
                    />
                </div> : 'Nothing to display. Try to search something!'
            }
        </>
    )
}

export default SearchPage;
