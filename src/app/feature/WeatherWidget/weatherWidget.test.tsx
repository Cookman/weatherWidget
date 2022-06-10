import {getDataKey} from "./weatherWidget.helpers";
import CountryInfo from "./CountryInfo";
import {render, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../../../state/store";
import React from "react";
import WeatherWidget from "./WeatherWidget";
import {axiosInstance} from "../../../utils/api.axios";

const mockData = {
    "location": {
        "name": "Potters Bar",
        "region": "Hertfordshire",
        "country": "United Kingdom",
        "lat": 51.7,
        "lon": -0.18,
        "tz_id": "Europe/London",
        "localtime_epoch": 1654863445,
        "localtime": "2022-06-10 13:17"
    },
    "current": {
        "last_updated_epoch": 1654858800,
        "last_updated": "2022-06-10 12:00",
        "temp_c": 21.0,
        "temp_f": 69.8,
        "is_day": 1,
        "condition": {"text": "Partly cloudy", "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png", "code": 1003},
        "wind_mph": 12.5,
        "wind_kph": 20.2,
        "wind_degree": 260,
        "wind_dir": "W",
        "pressure_mb": 1018.0,
        "pressure_in": 30.06,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 49,
        "cloud": 25,
        "feelslike_c": 21.0,
        "feelslike_f": 69.8,
        "vis_km": 10.0,
        "vis_miles": 6.0,
        "uv": 6.0,
        "gust_mph": 15.0,
        "gust_kph": 24.1
    }
}
const mockGeolocation = {
        getCurrentPosition: (callback: Function) => {
            callback({
                coords: {latitude: 51.6938446, longitude: -0.1774186}
            })
        },
        watchPosition: jest.fn()
    }
;
// @ts-ignore
global.navigator.geolocation = mockGeolocation;
jest.mock('../Map/map.helpers.ts', () => require('../../../tests/map.helpers.ts')); // eslint-disable-line
axiosInstance.get = jest.fn();


describe('Weather widget test', () => {

    test('it should return longLat key', () => {
        const key = getDataKey({latitude: 123, longitude: 456})
        expect(key).toEqual('123,456');
    });

    test('it should render CountyInfo', () => {
        const {getByText} = render(<CountryInfo weatherData={mockData}/>);

        expect(getByText('Potters Bar')).toBeInTheDocument();
    });

    test('it should render Widget', async () => {
        // @ts-ignore
        axiosInstance.get.mockImplementation(() => Promise.resolve({status: 200, data: mockData}));

        const {findByText} = render(<Provider store={store}>
            <WeatherWidget/>
        </Provider>);

        await waitFor(() => expect(axiosInstance.get).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(axiosInstance.get).toHaveBeenCalledWith(
            '?q=51.6938446,-0.1774186&&key=b4fb0adb438146059f9205712220906',
            {"params": {"q": "51.6938446,-0.1774186"}}))
        expect(await findByText('Potters Bar')).toBeVisible()

    });

})