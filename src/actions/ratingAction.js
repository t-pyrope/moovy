const addRating = (id, rating, posterUrl, title) => {
    return {
        type: "ADD_RATING",
        payload: {
            id, rating, posterUrl, title
        }
    }
}

export default addRating;
