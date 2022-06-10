import React from 'react';
import styled from "styled-components";
import {WeatherResponse} from "../../../state/weather/weather.types";


type Props = { weatherData: WeatherResponse };
const TitleWrapper = styled.div`
  width: 100%`

const CountryWrapper = styled.div`
  font-size: 8px`
const CountryInfo: React.FC<Props> = ({weatherData}) => (
    <TitleWrapper>
        <div>{weatherData?.location?.name}</div>
        <CountryWrapper>({weatherData?.location?.country})</CountryWrapper>
    </TitleWrapper>)


export default CountryInfo;
