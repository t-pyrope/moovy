import React from 'react';

import FilterPanel from './FilterPanel';
import Card from './Card';
import { Pagination } from '@material-ui/lab';
import { ImageList, Button } from '@material-ui/core';
import MoviesSkeleton from './skeleton/MoviesSkeleton';

const MoviesContainer = ({
    movies, count, page,
    genres, activeGenres,
    onChipClick, onPaginationChange,
    ratings, activeRatings, isLoading,
    downloadMore, showMoreDisabled,
}) => {

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
                        onChipClick={onChipClick}
                        color="default"
                    />
            }
            {(!movies.length && ratings)
                ? <p style={{ marginTop: '1rem' }}>No movies on chosen filters</p>
                : <>
                    <Pagination
                        count={count}
                        page={page}
                        onChange={onPaginationChange}
                        size="large"
                    />
                    { isLoading
                        ? <MoviesSkeleton />
                        : <ImageList
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
                    }
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: '1rem' }}
                        onClick={downloadMore}
                        disabled={showMoreDisabled}
                    >
                        Show more
                    </Button>
                    <Pagination
                        count={count}
                        page={page}
                        onChange={onPaginationChange}
                        size="large"
                    />
                </>
            }
        </div>
    )
}

export default MoviesContainer;
