import React from 'react';

import { useParams } from 'react-router-dom';

import FilterPanel from './FilterPanel';
import Card from './Card';
import { Pagination } from '@material-ui/lab';
import { ImageList } from '@material-ui/core';

const MoviesContainer = ({
    movies, count,
    genres, activeGenres,
    onChipClick, onPaginationChange
}) => {
    let { pageId } = useParams();

    return(
        <div className="container_flex container_flex_column container_flex_column_center">
            {genres &&
                <FilterPanel
                    genres={genres}
                    activeGenres={activeGenres}
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
