import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../state/hooks';
import {
    fetchCurrentWeatherAsync,
    isLoadingSelector,
    weatherDataSelector,
    weatherErrorSelector
} from '../../../state/weather/weather.slice';
import {shallowEqual} from "react-redux";
import styled from "styled-components";
// @ts-ignore
import {ReactComponent as MapIcon} from '../../../icons/map.svg';
import MapModal from "../Map/MapModal";
import ReactDOM from 'react-dom';
import {getDataKey, getLocationQuery} from "./weatherWidget.helpers";
import Spinner from "../../components/Spinner";
import {LocationType} from "../../../state/types";
import CountryInfo from "./CountryInfo";
import WeatherInfo from "./WeatherInfo";

const WidgetWrapper = styled.div`
  background: #8C8E93;
  border-radius: 12px;
  width: 200px;
  padding: 6px;
  margin: 24px;
  color: white;
  box-shadow: 0 3px 5px 0 rgba(170, 170, 170, 0.5);
  height: 150px;
  width: 200px;
  position: relative;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 8px 0 rgba(170, 170, 170, 1);
  }
`

const ErrorWrapper = styled.div`
  color: red;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WeatherWidget = () => {
        const dispatch = useAppDispatch();

        const [location, setLocation] = useState<LocationType>(null);

        const weatherData = useAppSelector(state => weatherDataSelector(state, getDataKey(location)), shallowEqual)
        const isLoading = useAppSelector(state => isLoadingSelector(state, getDataKey(location)), shallowEqual)
        const error = useAppSelector(state => weatherErrorSelector(state, getDataKey(location)), shallowEqual)

        const [modalVisible, setModalVisible] = useState(false)
        const [toolsVisible, setToolsVisible] = useState(false)

        useEffect(() => {
            const fetchLocation = () => {
                if (location) {
                    dispatch(fetchCurrentWeatherAsync({q: `${location.latitude},${location.longitude}`}))
                } else {
                    getLocationQuery(q => {
                        setLocation({latitude: q.latitude, longitude: q.longitude})
                        dispatch(fetchCurrentWeatherAsync({q: `${q.latitude},${q.longitude}`}))
                    })
                }
            }
            fetchLocation()
            const id = setInterval(fetchLocation, 30000)

            return () => {
                clearInterval(id)
            }
        }, [location, dispatch]);

        return (<>
                <WidgetWrapper onMouseEnter={() => setToolsVisible(true)}
                               onMouseLeave={() => setToolsVisible(false)}
                               onClick={() => {
                                   setModalVisible(true)
                               }}>
                    {!isLoading && !error &&
                        <>
                            <CountryInfo weatherData={weatherData}/>
                            <WeatherInfo weatherData={weatherData}/>
                        </>
                    }
                    {isLoading && <Spinner/>}
                    {error && <ErrorWrapper>Error: {error}</ErrorWrapper>}
                </WidgetWrapper>
                {modalVisible &&
                    ReactDOM.createPortal(<MapModal defaultLocation={location} onClose={(data) => {
                        setLocation(data)
                        setModalVisible(false)
                    }}/>, document.body)}
            </>
        );
    }
;

export default WeatherWidget;
