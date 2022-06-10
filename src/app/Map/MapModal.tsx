import React, {useState} from 'react';
import styled from "styled-components";
import MapViewer from "./MapViewer";
import {useAppDispatch} from "../../state/hooks";
import {hideModal} from "../../state/ui/ui.slice";


type Props = {};

const ModalWrapper = styled.div`
  position: absolute;
  z-index: 1;
`

const MapModal: React.FC<Props> = ({}) => {
    const dispatch = useAppDispatch()

    const [selectedPoint, setSelectedPoint] = useState<{ lat: any, lon: any } | null>(null)

    return (
        <ModalWrapper>
            <MapViewer onClick={setSelectedPoint}/>
            <div>
                <button onClick={() => {
                    dispatch(hideModal())
                }}>OK
                </button>
            </div>
        </ModalWrapper>
    );
};

export default MapModal;
