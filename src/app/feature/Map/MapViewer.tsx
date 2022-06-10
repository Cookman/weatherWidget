// @ts-nocheck
import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {buildMap} from "./map.helpers";
import {LocationType} from "../../../state/types";

type Props = {
    defaultLocation?: LocationType;
    onClick: (data: LocationType) => void
}

const MapRow = styled.div`
  text-align: center;
  height: 500px;
  width: 500px;
`

const MapViewer: React.FC<Props> = ({onClick, defaultLocation}) => {
    const mapElement = useRef(null);

    useEffect(() => {
        const initializeMap = (coords) => {
            buildMap(coords, mapElement, onClick)
        }

        if (defaultLocation) {
            initializeMap([defaultLocation.longitude, defaultLocation.latitude])
        } else {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    initializeMap([pos.coords.longitude, pos.coords.latitude])
                },
                e => {

                },
                {enableHighAccuracy: true},
            );
        }

    }, [mapElement, defaultLocation, onClick]);

    return (
        <MapRow ref={mapElement} className="map-container"/>
    );
}

export default MapViewer;
