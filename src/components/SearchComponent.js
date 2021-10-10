import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { fetchTitleSearch, fetchBothSearch } from '../actions/searchAction';

import {
    IconButton, FormGroup, TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchComponent = ({ extended = false, page = 1 }) => {
    const [titleValue, setTitleValue] = useState('');
    const [yearValue, setYearValue] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const { title } = useSelector(state => state.search);

    useEffect(() => {
        if (title && extended) setTitleValue(title);
    }, [title, extended, setTitleValue])

    const onChange = (e) => {
        const inputName = e.target.name;
        if (inputName === "title") setTitleValue(e.target.value);
        if (inputName === "year") setYearValue(e.target.value);
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if (titleValue && !yearValue) dispatch(fetchTitleSearch(titleValue, page));
        if (titleValue && yearValue) dispatch(fetchBothSearch(titleValue, yearValue, page));
        if (!extended) setTitleValue('');
        history.push("/search");
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
        <FormGroup row className="form_search">
            <TextField
                inputProps={{
                    'aria-label': 'search movies',
                    'placeholder': 'Search movies'
                }}
                value={titleValue}
                name="title"
                onChange={(e) => onChange(e)}
                style={{ marginRight: '1rem' }}
            />
            { extended &&
                <TextField
                    inputProps={{
                        'aria-label': 'search year',
                        'placeholder': 'add year (optional)'
                    }}
                    value={yearValue}
                    name="year"
                    onChange={(e) => onChange(e)}
                />
            }
            <IconButton type="submit" disabled={!titleValue.length}>
                <SearchIcon />
            </IconButton>
        </FormGroup>
        </form>
    )
}

export default SearchComponent;
