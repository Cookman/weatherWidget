export type WeatherResponse = {
    "location": {
        "name": string;
        "region": string;
        "country": string;
        "lat": number; "lon": number;
    }, "current": {
        "temp_c": number;
        "condition": { "text": string; "icon": string; },
        "wind_mph": number;
        "feelslike_c": number;
    }
}

export interface WeatherState {
    value: Record<string, WeatherResponse>;
    isLoading: Record<string, boolean>;
    error: Record<string, string>
}