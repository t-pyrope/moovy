import searchReducer from '../searchReducer';

describe('search reducer', () => {
    it('fetches search by title', () => {
        const initState = {
            searchedMovies: [],
            title: '',
            year: '',
            page: 1,
            searchBy: '',
            length: 0,
            errorMessage: ''
        }

        const action = {
            type: 'FETCH_SEARCH_TITLE',
            payload: {
                searchedMovies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                title: "Title",
                page: 4,
                searchBy: 'searchByTitle',
                length: '133',
            }
        }

        expect(searchReducer(initState, action)).toEqual({
            searchedMovies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            title: 'Title',
            year: '',
            page: 4,
            searchBy: 'searchByTitle',
            length: '133',
            errorMessage: ''
        })
    })

    it('rewrites existing search with new search by title', () => {
        const initState = {
            searchedMovies: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            title: 'Great',
            year: '2020',
            page: 4,
            searchBy: 'searchByTitle',
            length: '240',
            errorMessage: ''
        }

        const action = {
            type: 'FETCH_SEARCH_TITLE',
            payload: {
                searchedMovies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                title: "Title",
                page: 4,
                searchBy: 'searchByTitle',
                length: '133',
            }
        }

        expect(searchReducer(initState, action)).toEqual({
            searchedMovies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            title: 'Title',
            year: '',
            page: 4,
            searchBy: 'searchByTitle',
            length: '133',
            errorMessage: ''
        })
    })

    it('rewrites error with new search by title', () => {
        const initState = {
            searchedMovies: [],
            title: 'Great',
            year: '',
            page: 1,
            searchBy: 'searchByTitle',
            length: '',
            errorMessage: `Couldn't find anything for Great`
        }

        const action = {
            type: 'FETCH_SEARCH_TITLE',
            payload: {
                searchedMovies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                title: "Title",
                page: 1,
                searchBy: 'searchByTitle',
                length: '133',
            }
        }

        expect(searchReducer(initState, action)).toEqual({
            searchedMovies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            title: 'Title',
            year: '',
            page: 1,
            searchBy: 'searchByTitle',
            length: '133',
            errorMessage: ''
        })
    })
    

    it('gives error message, when no found movies, from existing search', () => {
        const initState = {
            searchedMovies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            title: 'Title',
            year: '',
            page: 4,
            searchBy: 'searchByTitle',
            length: '133',
            errorMessage: ''
        }

        const action = {
            type: 'FETCH_SEARCH_TITLE',
            payload: {
                searchedMovies: undefined,
                title: "Title",
                page: 1,
                searchBy: 'searchByTitle',
                length: undefined,
            }
        }

        expect(searchReducer(initState, action)).toEqual({
            searchedMovies: [],
            title: 'Title',
            year: '',
            page: 1,
            searchBy: 'searchByTitle',
            length: '',
            errorMessage: `Couldn't find anything for Title`
        })
    })

    it('searches by title and year', () => {
        const initState = {
            searchedMovies: [],
            title: '',
            year: '',
            page: 1,
            searchBy: '',
            length: 0,
            errorMessage: ''
        }

        const action = {
            type: 'FETCH_SEARCH_BOTH',
            payload: {
                searchedMovies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                title: "Title",
                year: '2021',
                page: 4,
                searchBy: 'searchByTitle',
                length: '133',
            }
        }

        expect(searchReducer(initState, action)).toEqual({
            searchedMovies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            title: 'Title',
            year: '2021',
            page: 4,
            searchBy: 'searchByTitle',
            length: '133',
            errorMessage: ''
        })
    })

    it('gives error when no movies by given title and year', () => {
        const initState = {
            searchedMovies: [],
            title: '',
            year: '',
            page: 1,
            searchBy: '',
            length: 0,
            errorMessage: ''
        }

        const action = {
            type: 'FETCH_SEARCH_BOTH',
            payload: {
                searchedMovies: undefined,
                title: "Title",
                year: '2021',
                page: 1,
                searchBy: 'searchByTitle',
                length: undefined,
            }
        }

        expect(searchReducer(initState, action)).toEqual({
            searchedMovies: [],
            title: 'Title',
            year: '2021',
            page: 1,
            searchBy: 'searchByTitle',
            length: '',
            errorMessage: `Couldn't find anything for Title, 2021`,
        })
    })
})
