import ratedMoviesReducer from '../ratedMoviesReducer';

describe('rated movies reducer', () => {
    it('adds rated movie', () => {
        const initState = {
            ratedMovies: [],
            genres: [],
            ratings: []
        }

        const action = {
            type: 'ADD_RATING',
            payload: {
                id: '12345',
                rating: 5,
                posterUrl: 'some-url',
                title: 'Some cool movie',
                genres: 'cool, action'
            },
        }

        expect(ratedMoviesReducer(initState, action)).toEqual({
            ratedMovies: [
                {
                    imdbID: '12345',
                    rating: 5,
                    Poster: 'some-url',
                    Title: 'Some cool movie',
                    genres: ['cool', 'action'],
                }
            ],
            genres: ['cool', 'action'],
            ratings: [5]
        })
    })

    it('rewrites old rating', () => {
        const initState = {
            ratedMovies: [
                {
                    imdbID: '12345',
                    rating: 5,
                    Poster: 'some-url',
                    Title: 'Some cool movie',
                    genres: ['cool', 'action'],
                }
            ],
            genres: ['cool', 'action'],
            ratings: [5]
        }

        const action = {
            type: 'ADD_RATING',
            payload: {
                id: '12345',
                rating: 4,
                posterUrl: 'some-url',
                title: 'Some cool movie',
                genres: 'cool, action'
            },
        }

        expect(ratedMoviesReducer(initState, action)).toEqual({
            ratedMovies: [
                {
                    imdbID: '12345',
                    rating: 4,
                    Poster: 'some-url',
                    Title: 'Some cool movie',
                    genres: ['cool', 'action'],
                }
            ],
            genres: ['cool', 'action'],
            ratings: [4]
        })
    })
})
