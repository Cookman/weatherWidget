# weatherWidget

A small React + Redux weather widget that fetches current weather for a user location and displays it in a compact card.

## Requirements
- Node.js 18+
- npm 9+

## Install
```bash
npm install
```

## Run locally
```bash
npm start
```

This starts the app in development mode.

## Run tests
```bash
npm test -- --watchAll=false
```

## Architecture notes
- `WeatherWidget` is the main feature component. It requests geolocation, dispatches weather fetches, and renders weather/loading/error states.
- Redux state for weather data lives in `src/state/weather/weather.slice.ts`.
- API requests are wrapped by `createGETRequest` in `src/utils/api.axios.ts`.
- `MapModal` lets users choose a location manually.

## Geolocation fallback behavior
When geolocation is unavailable or denied, `getLocationQuery` falls back to default coordinates (`51.6938446, -0.1774186`) so the widget still loads weather data.
