import React from 'react';
import './App.css';
import WeatherWidget from "./app/WeatherWidget/WeatherWidget";

function App() {
    console.log('APP')
    return (
        <div className="App">
            <WeatherWidget/>
        </div>
    );
}


export default App;
