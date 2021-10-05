import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import useQuery from '../helpers/useQuery';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTitleSearch, fetchBothSearch } from '../actions/searchAction';

import MoviesContainer from '../components/MoviesContainer';
import ScrollTop from '../components/ScrollTop';

const SearchPage = () => {
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const query = useQuery();

    const {
        searchedMovies, title, year,
        searchBy, errorMessage, length
    } = useSelector(state => state.search);
    
    const history = useHistory();
    const dispatch = useDispatch();
    const { url } = useRouteMatch();

    useEffect(() => {
        if(!(title.length && searchedMovies.length)) {
            history.push(url);
        } else if (!searchedMovies.length) {
            if (!year.length) {
                history.push(`${url}?title=${title}`)
            } else {
                history.push(`${url}?title=${title}&year=${year}`)
            }
        } else {
            if (!year.length) {
                history.push(`${url}?title=${title}&page=${page}`);
            } else {
                history.push(`${url}?title=${title}&year=${year}&page=${page}`);
            }
        }
    }, [title, url, history, page, searchedMovies, year])

    useEffect(() => {
        setCount(Math.ceil(length / 10))
    }, [setCount, length])

    useEffect(() => {
        // set page to 1, when user searches for something different
        setPage(1);
    }, [title])

    useEffect(() => {
        // activate skeleton between page switches
        setIsLoading(true);
        let timeout = setTimeout(() => {
            setIsLoading(false)
        }, 1000);
        return () => {
            clearTimeout(timeout);
        }
    }, [page])

    const onPaginationChange = (e, p) => {
        switch(searchBy) {
            case 'searchByTitle':
                dispatch(fetchTitleSearch(title, p));
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
            {query.get("page")
                ? <>
                <h2>Search for: {title}{year ? `, ${year}` : ''} </h2>
                <MoviesContainer
                    movies={searchedMovies}
                    count={count}
                    onPaginationChange={onPaginationChange}
                    isLoading={isLoading}
                    page={page}
                />
            </>
                : errorMessage ?
                <p>{errorMessage} <i>{title}{year ? `, ${year}` : ''}</i></p> 
                : title.length
                    ? ''
                    : <p>Nothing to display. Try to search something!</p>
            }
            <ScrollTop />
        </>
    )
}

export default SearchPage;
