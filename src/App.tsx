import React, {useCallback, useState} from 'react';
import './App.css';
import WeatherWidget from "./app/WeatherWidget/WeatherWidget";
import MapModal from "./app/Map/MapModal";
import {shallowEqual, useSelector} from "react-redux";
import {modalVisibleSelector} from "./state/ui/ui.slice";

function App() {

    const modalVisible = useSelector(modalVisibleSelector, shallowEqual)
    const [location, setLocation] = useState(null);
    const onClick = useCallback((data: any) => {
        setLocation(data)
    }, [])
    return (
        <div className="App">
            <WeatherWidget location={location}/>
            {modalVisible && <MapModal/>}
        </div>
    );
}


export default App;
