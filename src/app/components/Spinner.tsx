import React from 'react';
import './loader.css'
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const Spinner = () => (
    <SpinnerWrapper>
        <div className='lds-dual-ring'></div>
    </SpinnerWrapper>)

export default Spinner;
