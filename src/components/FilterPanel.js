import React from 'react';
import { Chip } from '@material-ui/core'

const FilterPanel = ({ genres }) => {
    return(
        <div>
            {genres.map(genre =>
                <>
                    <Chip label={genre} color="secondary" />
                    {" "}
                </>
            )}
        </div>
    )
}

export default FilterPanel;
