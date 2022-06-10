import React from 'react';
import styled from "styled-components";
import {WeatherResponse} from "../../../state/weather/weather.types";


type Props = { weatherData: WeatherResponse };

const InfoWrapper = styled.div`
  margin-top: 10px;
  border-top: 1px solid darkgray;
  padding-top: 10px;
`

const WeatherInfo: React.FC<Props> = ({weatherData}) => (
    <InfoWrapper>
        <div>{weatherData?.current?.temp_c}℃</div>
        <div>{weatherData?.current?.condition?.text}</div>
        <img src={weatherData?.current?.condition?.icon} alt=''/>
    </InfoWrapper>)


export default WeatherInfo;
