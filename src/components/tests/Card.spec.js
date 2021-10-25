import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Card from '../Card';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
    useDispatch: () => {},
    useSelector: () => ({
        ratedMovies: [{
            imdbID: '12345',
            rating: 4
        }]
    })
}))

describe('Card', () => {
    const posterUrl = 'posterUrl';
    const title = 'Some title';
    const id = '12345';

    describe('New Card', () => {
        const card = mount(
            <Card
                poster={posterUrl}
                title={title}
                id={id}
            />
        )
        // it('renders properly', () => {
        //     expect(card).toMatchSnapshot();
        // })

        it('returns Card component', () => {
            expect(card.find('img')).toHaveLength(1);
            expect(card.find('div.MuiImageListItem-item')).toHaveLength(1);
            expect(card.find('div.MuiImageListItemBar-root')).toHaveLength(1);
            expect(card.find('div.MuiImageListItemBar-titleWrap')).toHaveLength(1);
            expect(card.find('div.MuiImageListItemBar-title')).toHaveLength(1);
            expect(card.find('div.MuiImageListItemBar-subtitle')).toHaveLength(1);
            expect(card.find('span.MuiRating-root')).toHaveLength(1);
            expect(card.find('span.MuiRating-iconFilled')).toHaveLength(4);
            expect(card.find('span.MuiRating-iconEmpty')).toHaveLength(1);
            expect(card.find('label.MuiRating-label')).toHaveLength(5);
            expect(card.find('img').prop('alt')).toEqual(title);
            expect(card.find('img').prop('src')).toEqual(posterUrl);
        })
    })
})