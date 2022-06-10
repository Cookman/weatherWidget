// @ts-nocheck
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {fromLonLat, transform} from "ol/proj";
import {Vector} from "ol/layer";
import {Vector as SVector} from "ol/source";
import {Circle} from "ol/geom";
import {Fill, Stroke, Style} from "ol/style";
import {Feature, Map as OlMap, View} from "ol";

export const buildMap = (coords, mapElement, onClick) => {
    let prevLayer = null
    const initialMap = new OlMap({
        target: mapElement.current,
        layers: [
            new TileLayer({source: new OSM()})
        ],
        controls: [],
        view: new View({center: [0, 0], zoom: 1})
    });
    initialMap.getView().setCenter(transform(coords, 'EPSG:4326', 'EPSG:3857'));
    initialMap.getView().setZoom(12);

    const drawMarker = (lonlat) => {
        const centerLongitudeLatitude = fromLonLat(lonlat);

        const layer = new Vector({
            source: new SVector({
                projection: 'EPSG:4326',
                features: [new Feature(new Circle(centerLongitudeLatitude, 200))]
            }),
            style: [
                new Style({
                    stroke: new Stroke({
                        color: 'blue',
                        width: 3
                    }),
                    fill: new Fill({
                        color: 'rgba(0, 0, 255, 0.1)'
                    })
                })
            ]
        });
        initialMap.addLayer(layer);
        if (prevLayer) {
            initialMap.removeLayer(prevLayer)
        }
        prevLayer = layer
    }
    drawMarker(coords)

    initialMap.on('click', (event) => {
        const lonlat = transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        const longitude = lonlat[0];
        const latitude = lonlat[1];
        onClick({latitude, longitude})
        drawMarker(lonlat)
    })

    return initialMap
}