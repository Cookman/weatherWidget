import React, {useEffect} from 'react';
import {useAppDispatch} from "../../state/hooks";
import {fetchCurrentWeatherAsync} from "../../state/weather/weather.slice";


type Props = {};

const WeatherWidget: React.FC<Props> = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
       // dispatch(fetchCurrentWeatherAsync({q: 'London'}))
    }, [])

    return (
        <div>WeatherWidget</div>
    );
};

export default WeatherWidget;
