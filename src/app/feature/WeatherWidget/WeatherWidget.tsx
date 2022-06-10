import React, {useEffect, useMemo, useState} from 'react';
import {useAppDispatch} from '../../../state/hooks';
import {
    fetchCurrentWeatherAsync,
    isLoadingSelector,
    weatherDataSelector,
    weatherErrorSelector
} from '../../../state/weather/weather.slice';
import {shallowEqual, useSelector} from "react-redux";
import styled from "styled-components";
// @ts-ignore
import {ReactComponent as MapIcon} from '../../../icons/map.svg';
import MapModal from "../Map/MapModal";
import ReactDOM from 'react-dom';

import {getLocationQuery} from "./weatherWidget.helpers";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";



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
`

const ToolsWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
`


const ErrorWrapper = styled.div`
  color: red;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TitleWrapper = styled.div`
  width: 100%`

const CountryWrapper = styled.div`
  font-size: 8px`

const InfoWrapper = styled.div`
  margin-top: 10px;
  border-top: 1px solid darkgray;
  padding-top: 10px;
`

const WeatherWidget = () => {
        const dispatch = useAppDispatch();

        const isLoading = useSelector(isLoadingSelector, shallowEqual)
        const weatherData = useSelector(weatherDataSelector, shallowEqual)
        const error = useSelector(weatherErrorSelector, shallowEqual)

        const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
        const [modalVisible, setModalVisible] = useState(false)
        const [toolsVisible, setToolsVisible] = useState(false
        )

        useEffect(() => {
            if (location) {
                dispatch(fetchCurrentWeatherAsync({q: `${location.lat},${location.lon}`}))
            } else {
                getLocationQuery(q => dispatch(fetchCurrentWeatherAsync({q})))
            }
        }, [location,dispatch]);

        const countryInfo = useMemo(() => (
                <TitleWrapper>
                    <div>{weatherData?.location?.name}</div>
                    <CountryWrapper>({weatherData?.location?.country})</CountryWrapper>
                </TitleWrapper>),
            [weatherData]
        )

        const weatherInfo = useMemo(() => (
                <InfoWrapper>
                    <div>{weatherData?.current?.temp_c}℃</div>
                    <div>{weatherData?.current?.condition?.text}</div>
                    <img src={weatherData?.current?.condition?.icon} alt=''/>
                </InfoWrapper>
            ),
            [weatherData]
        )

        return (<>
                <WidgetWrapper onMouseEnter={() => setToolsVisible(true)}
                               onMouseLeave={() => setToolsVisible(false)}>
                    {!isLoading && !error &&
                        <>
                            {countryInfo}
                            {toolsVisible && <ToolsWrapper>
                                <Button onClick={() => {
                                    setToolsVisible(false)
                                    setModalVisible(true)
                                }}
                                        Icon={() => <MapIcon width={20}/>}/>
                            </ToolsWrapper>}
                            {weatherInfo}
                        </>
                    }
                    {isLoading && <Spinner/>}
                    {error && <ErrorWrapper>Error: {error}</ErrorWrapper>}
                </WidgetWrapper>
                {modalVisible && ReactDOM.createPortal(<MapModal defaultLocation={location} onClose={(data) => {
                    setLocation(data)

                    setModalVisible(false)
                }}/>, document.body)}

            </>
        );
    }
;

export default WeatherWidget;
