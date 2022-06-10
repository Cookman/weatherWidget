import React, {useState} from 'react';
import WeatherWidget from "./app/feature/WeatherWidget/WeatherWidget";
import Button from "./app/components/Button";
import styled from "styled-components";
// @ts-ignore
import {ReactComponent as PlusIcon} from './icons/plus.svg';

const AppWrapper = styled.div`
  text-align: center;
  margin-top: 10px;`

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 10px;`

function App() {

    const [nextId, setNextId] = useState(0)
    const [widgets, setWidgets] = useState([{id: nextId}])

    return (
        <AppWrapper>
            <Button onClick={() => {
                setNextId(nextId + 1)
                setWidgets([...widgets, {id: nextId + 1}])
            }}
                    Icon={() => <PlusIcon width={20}/>}
                    title='Add widget'/>
            <ContentWrapper>
                {widgets.map(({id}) => {
                    return <WeatherWidget key={id}/>
                })}
            </ContentWrapper>
        </AppWrapper>
    );
}

export default App;
