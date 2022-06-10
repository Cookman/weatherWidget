/**
 * PASA Confidentiality Notice:
 * This source code and information contained herewith may be legally privileged and confidential
 * Any dissemination, distribution or copy of this source code is strictly prohibited.
 *
 * Copyright (C) 2022, Panasonic Automotive Systems Company of America
 *                     All Rights Reserved
 *
 *
 * @file: Spinner.tsx
 *
 * @author: Panasonic, developer
 *
 */
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
        <div className={'lds-dual-ring'}></div>
    </SpinnerWrapper>)


export default Spinner;
