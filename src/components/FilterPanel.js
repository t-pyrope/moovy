import React from 'react';
import { Chip } from '@material-ui/core'

const FilterPanel = ({ genres, activeGenres, onChipClick }) => {
    return(
        <div className="container_flex container_flex_small-gap">
            {genres.map(genre =>
                <span key={genre}>
                    <Chip
                        label={genre}
                        color="secondary"
                        variant={activeGenres.includes(genre) ? 'default' : 'outlined'}
                        onClick={() => onChipClick(genre)}
                    />
                    {" "}
                </span>
            )}
        </div>
    )
}

export default FilterPanel;
