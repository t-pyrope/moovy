import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTitleSearch, fetchBothSearch } from '../actions/searchAction';

import MoviesContainer from '../components/MoviesContainer';
import ScrollTop from '../components/ScrollTop';

const SearchPage = () => {
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const {
        searchedMovies, title, year,
        searchBy, errorMessage, length
    } = useSelector(state => state.search);
    
    const history = useHistory();
    const dispatch = useDispatch();
    const { path, url } = useRouteMatch();

    useEffect(() => {
        if(!searchedMovies.length) {
            history.push(url);
        } else {
            history.push(`${url}/${page}`);
        }
    }, [searchedMovies.length, url, history, page])

    useEffect(() => {
        setCount(Math.ceil(length / 10))
    }, [setCount, length])

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
            <Switch>
                <Route
                    path={path}
                    render={() => errorMessage ?
                        <p>{errorMessage}</p> 
                        :<p>Nothing to display. Try to search something!</p>
                    }
                    exact
                />
                <Route
                    path={`${path}/:pageId`}
                    render={() =>
                        <>
                            <h2>Search for: {title}{year ? `, ${year}` : ''} </h2>
                            <MoviesContainer
                                movies={searchedMovies}
                                count={count}
                                onPaginationChange={onPaginationChange}
                            />
                        </>
                    }
                />
            </Switch>
            <ScrollTop />
        </>
    )
}

export default SearchPage;
