import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from './state/store';
import App from './App';

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
};

// @ts-ignore
global.navigator.geolocation = mockGeolocation;
jest.mock('./app/feature/Map/map.helpers.ts', () => require('./tests/map.helpers.ts')); // eslint-disable-line

test('it renders App with ad widget button and empty widget', () => {
    const {getByText} = render(
        <Provider store={store}>
            <App/>
        </Provider>
    );

    expect(getByText('Add widget')).toBeInTheDocument();
    expect(getByText('℃')).toBeInTheDocument();
});
