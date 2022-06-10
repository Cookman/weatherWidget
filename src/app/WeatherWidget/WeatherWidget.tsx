import React, {useEffect} from 'react';
import {useAppDispatch} from '../../state/hooks';
import {
    fetchCurrentWeatherAsync,
    isLoadingSelector,
    weatherDataSelector,
    weatherErrorSelector
} from '../../state/weather/weather.slice';
import {shallowEqual, useSelector} from "react-redux";
import styled from "styled-components";
import {showModal} from "../../state/ui/ui.slice";
// @ts-ignore
import {ReactComponent as MapIcon} from '../../icons/map.svg';

type Props = {
    location?: { lat: number; lon: number } | null
};


const WidgetWrapper = styled.div`
  background: #8C8E93;
  border-radius: 12px;
  width: 200px;
  padding: 24px;
  color: white;
`

const mockData = {
    "location": {
        "name": "Potters Bar",
        "region": "Hertfordshire",
        "country": "United Kingdom",
        "lat": 51.69,
        "lon": -0.18,
        "tz_id": "Europe/London",
        "localtime_epoch": 1654811231,
        "localtime": "2022-06-09 22:47"
    },
    "current": {
        "last_updated_epoch": 1654810200,
        "last_updated": "2022-06-09 22:30",
        "temp_c": 16.0,
        "temp_f": 60.8,
        "is_day": 0,
        "condition": {
            "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
            "code": 1003
        },
        "wind_mph": 9.4,
        "wind_kph": 15.1,
        "wind_degree": 220,
        "wind_dir": "SW",
        "pressure_mb": 1017.0,
        "pressure_in": 30.03,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 88,
        "cloud": 75,
        "feelslike_c": 16.0,
        "feelslike_f": 60.8,
        "vis_km": 10.0,
        "vis_miles": 6.0,
        "uv": 3.0,
        "gust_mph": 15.0,
        "gust_kph": 24.1
    }
}

const WeatherWidget: React.FC<Props> = ({location}) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(isLoadingSelector, shallowEqual)
    const weatherData = useSelector(weatherDataSelector, shallowEqual)
    const error = useSelector(weatherErrorSelector, shallowEqual)

    useEffect(() => {
        if (location) {
            dispatch(fetchCurrentWeatherAsync({q: `${location.lat},${location.lon}`}))
        }
        //   getLocationQuery(q => dispatch(fetchCurrentWeatherAsync({q})))
    }, [location]);

    return (
        <WidgetWrapper>
            <div>Weather Widget <button onClick={() => {
                dispatch(showModal())
            }}><MapIcon width={20}/></button></div>
            {isLoading && <div>Loading</div>}
            {weatherData?.location && <div>{weatherData.location.name}</div>}
            {weatherData?.current && <div>{weatherData.current.humidity}HM</div>}
            {error && <div>{error}</div>}
        </WidgetWrapper>
    );
};

export default WeatherWidget;
