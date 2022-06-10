import React, {useState} from 'react';
import './App.css';
import WeatherWidget from "./app/feature/WeatherWidget/WeatherWidget";
import Button from "./app/components/Button";
import styled from "styled-components";
// @ts-ignore
import {ReactComponent as PlusIcon} from './icons/plus.svg';

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap`

function App() {

    const [nextId, setNextId] = useState(0)
    const [widgets, setWidgets] = useState([{id: nextId}])

    return (
        <div className="App">

            <Button onClick={() => {
                setNextId(nextId + 1)
                setWidgets([...widgets, {id: nextId + 1}])

            }}
                    Icon={() => <PlusIcon width={20}/>}
                    title='Add widget'/>
            <AppWrapper>
                {widgets.map(({id}) => {
                    return <WeatherWidget key={id}/>
                })}

            </AppWrapper>
        </div>
    );
}


export default App;
