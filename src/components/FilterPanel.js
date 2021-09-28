import React from 'react';
import { Rating } from '@material-ui/lab';
import { Chip } from '@material-ui/core';

const FilterPanel = ({ items, activeItems, onChipClick, color }) => {
    return(
        <div className="container_flex container_flex_small-gap">
            {items.map(item =>
                <span key={item}>
                    <Chip
                        label={isFinite(item)
                            ? <Rating name={String(item)} value={item} size="small" max={item} readOnly />
                            : item
                        }
                        color={color}
                        variant={activeItems.includes(item) ? 'default' : 'outlined'}
                        onClick={() => onChipClick(item)}
                    />
                    {" "}
                </span>
            )}
        </div>
    )
}

export default FilterPanel;
