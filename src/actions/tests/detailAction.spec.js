import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { movieDetailURL } from '../../api';
import { LOADING_DETAIL, FETCH_DETAIL } from '../types';
import fetchDetail from '../detailAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

const details = {
    Title: "Title", Year: 'year', Genre: 'comedy',
    Poster: 'url', imdbRating: '5', Plot: 'plot',
    Actors: 'Actors'
}

describe('DetailAction', () => {
    beforeAll(() => {
        store.clearActions();
        mock.reset();
    })

    it('fetches detail', () => {
        mock.onGet(movieDetailURL('12345')).reply(200, details)
        store.dispatch(fetchDetail('12345')).then(() => {
            const expectedActions = [
                { type: LOADING_DETAIL },
                { 
                    type: FETCH_DETAIL,
                    payload: {
                        title: 'Title',
                        year: 'year',
                        genre: 'comedy',
                        posterUrl: 'url',
                        imdbRating: '5',
                        plot: 'plot',
                        actors: 'Actors',
                        id: '12345',
                    }
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
})
