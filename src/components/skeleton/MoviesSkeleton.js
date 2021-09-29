import React from 'react';
import skeletonImg from '../../assets/img/skeleton-img.jpg';

const MoviesSkeleton = ({ hasPagination = false }) => {
    return(

        <div className="skeleton_container">
            { hasPagination && <div className="skeleton_pagination" /> }
            <div className="container_grid">
                <img className="image_grid-item" src={skeletonImg} alt="" />
                <img className="image_grid-item" src={skeletonImg} alt="" />
                <img className="image_grid-item" src={skeletonImg} alt="" />
                <img className="image_grid-item" src={skeletonImg} alt="" />
                <img className="image_grid-item" src={skeletonImg} alt="" />
                <img className="image_grid-item" src={skeletonImg} alt="" />
                <img className="image_grid-item" src={skeletonImg} alt="" />
                <img className="image_grid-item" src={skeletonImg} alt="" />
                <img className="image_grid-item" src={skeletonImg} alt="" />
                <img className="image_grid-item" src={skeletonImg} alt="" />
            </div>
        </div>
    )
}

export default MoviesSkeleton;
