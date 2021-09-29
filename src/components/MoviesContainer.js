import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import FilterPanel from './FilterPanel';
import Card from './Card';
import { Pagination } from '@material-ui/lab';
import { ImageList } from '@material-ui/core';

const MoviesContainer = ({
    movies, count,
    genres, activeGenres,
    onChipClick, onPaginationChange,
    ratings, activeRatings,
    onRatingChipClick,
}) => {
    let { pageId } = useParams();

    return(
        <div className="container_flex container_flex_column container_flex_column_center">
            {genres &&
                <FilterPanel
                    items={genres}
                    activeItems={activeGenres}
                    onChipClick={onChipClick}
                    color="secondary"
                />
            }
            {
                ratings &&
                    <FilterPanel
                        items={ratings}
                        activeItems={activeRatings}
                        onChipClick={onRatingChipClick}
                        color="primary"
                    />
            }
            <Pagination
                count={count}
                page={+pageId}
                onChange={onPaginationChange}
                size="large"
            />
            <ImageList
                variant="masonry"
                className="container_grid"
            >
                {movies.map((m, i) =>
                    <Card
                        key={m.imdbID + i}
                        id={m.imdbID}
                        title={m.Title}
                        poster={m.Poster}
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
