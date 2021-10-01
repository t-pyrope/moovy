import detailReducer from '../detailReducer';

describe('detail reducer', () => {
    it('Returns loading in process', () => {
        const initState= {
            title: '',
            year: '',
            genre: '',
            posterUrl: '',
            imdbRating: '',
            plot: '',
            actors: '',
            id: '',
            isLoading: false,
        }

        const action = {
            type: "LOADING_DETAIL"
        }

        expect(detailReducer(initState, action)).toEqual({
            ...initState,
            isLoading: true,
        })
    })

    it('gets movie details', () => {
        const initState = {
            title: '',
            year: '',
            genre: '',
            posterUrl: '',
            imdbRating: '',
            plot: '',
            actors: '',
            id: '',
            isLoading: true,
        }

        const action = {
            type: 'FETCH_DETAIL',
            payload: {
                title: 'Arizona Dream',
                year: '1993',
                genre: 'comedy, drama',
                posterUrl: 'some-url',
                imdbRating: '10',
                plot: 'Axel has a dream about an Eskimo who catches a rare halibut and brings it back to his family in an igloo',
                actors: 'Johnny Depp, Jerry Lewis, Faye Dunaway',
                id: 12345,
            }
        }
        expect(detailReducer(initState, action)).toEqual({
            title: 'Arizona Dream',
            year: '1993',
            genre: 'comedy, drama',
            posterUrl: 'some-url',
            imdbRating: '10',
            plot: 'Axel has a dream about an Eskimo who catches a rare halibut and brings it back to his family in an igloo',
            actors: 'Johnny Depp, Jerry Lewis, Faye Dunaway',
            id: 12345,
            isLoading: false,
        })
    })
})
