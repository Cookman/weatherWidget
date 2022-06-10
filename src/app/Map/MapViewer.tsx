// @ts-nocheck
import React, {useEffect, useRef, useState} from "react";
import {Map as OlMap, View} from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import styled from "styled-components";
import {transform} from 'ol/proj';

type Props = {
    onClick: ({lat, lon}) => void
}

const MapRow = styled.div`
  text-align: center;
  height: 500px;
  width: 500px;
`

const MapViewer: React.FC<Props> = ({onClick}) => {
    const [map, setMap] = useState();
    const mapElement = useRef(null);

    useEffect(() => {
        const initialMap = new OlMap({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            controls: [],
            view: new View({
                center: [0, 0],
                zoom: 0
            })
        });
        setMap(initialMap);

        initialMap.on('click', (event) => {
            const lonlat = transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
            const lon = lonlat[0];
            const lat = lonlat[1];

            console.log(lon, lat)
            onClick({lat,lon})
        })
    }, [mapElement]);

    return (
        <MapRow className="mapRow">
            <MapRow ref={mapElement} className="map-container"/>
        </MapRow>
    );
}

export default MapViewer;
