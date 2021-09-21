import React from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import fetchDetail from '../actions/detailAction';

import FilterPanel from './FilterPanel';
import Card from './Card';
import { Pagination } from '@material-ui/lab';
import { ImageList } from '@material-ui/core';

const MoviesContainer = ({
    movies, count,
    filterPanel = null,
    onChipClick, onPaginationChange
}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    let { pageId } = useParams();

    const onClick = id => {
        dispatch(fetchDetail(id));
        history.push(`/movie/${id}`);
    }

    return(
        <div className="container_flex container_flex_column container_flex_column_center">
            {filterPanel &&
                <FilterPanel
                    genres={filterPanel.genres}
                    activeGenres={filterPanel.activeGenres}
                    onChipClick={onChipClick}
                />
            }
            <Pagination
                count={count}
                page={+pageId}
                onChange={onPaginationChange}
                size="large"
            />
            <ImageList style={{ gap: "1rem", justifyContent: "center" }}>
                {movies.map((m, i) =>
                    <Card
                        key={m.imdbID + i}
                        id={m.imdbID}
                        title={m.Title}
                        poster={m.Poster}
                        onClick={() => onClick(m.id)}
                    />
                )}
            </ImageList>
            <Pagination
                count={count}
                page={+pageId}
                onChange={onPaginationChange}
                size="large"
            />
        </div>
    )
}

export default MoviesContainer;
