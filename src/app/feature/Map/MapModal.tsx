import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import MapViewer from "./MapViewer";
import Button from "../../components/Button";
import {LocationType} from "../../../state/types";

type Props = {
    defaultLocation?: LocationType;
    onClose: (data: any) => void
};

const ModalWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MapWrapper = styled.div`
  padding: 10px;
  background: gray;
  border-radius: 12px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.4);
`

const ToolsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 10px 0;`


const ModalBackground = styled.div`
  background: #525b72;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1`

const MapModal: React.FC<Props> = ({onClose, defaultLocation = null}) => {

    const [selectedPoint, setSelectedPoint] = useState<{ latitude: number, longitude: number } | null>(defaultLocation)

    const onCloseHandler = useCallback(() => {
        onClose(selectedPoint)
    }, [onClose, selectedPoint])

    return (
        <ModalWrapper>
            <MapWrapper>
                <MapViewer onClick={setSelectedPoint} defaultLocation={defaultLocation}/>
                <ToolsWrapper>
                    <Button onClick={onCloseHandler} title={'OK'}/>
                </ToolsWrapper>
            </MapWrapper>
            <ModalBackground/>
        </ModalWrapper>
    );
};

export default MapModal;
