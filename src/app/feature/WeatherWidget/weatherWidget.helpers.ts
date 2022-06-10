export const getLocationQuery = (callback: (q:string) => void) => {
    navigator.geolocation.getCurrentPosition(
        pos => {
            callback(`${pos.coords.latitude},${pos.coords.longitude}`);
        },
        e => {
            callback('London');
        },
        {enableHighAccuracy: true},
    );
}