import {LocationType} from "../../../state/types";

export const getLocationQuery = (callback: (q: {
    latitude: number; longitude: number;
}) => void) => {
    navigator.geolocation.getCurrentPosition(
        pos => {
            callback(pos.coords);
        },
        e => {
            callback({
                latitude: 51.6938446, longitude: -0.1774186
            });
        },
        {enableHighAccuracy: true},
    );
}

export const getDataKey = (location: LocationType) => `${location?.latitude},${location?.longitude}`