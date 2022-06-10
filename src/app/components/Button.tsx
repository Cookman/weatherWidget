import React, {ReactElement} from 'react';
import styled from "styled-components";

type Props = {
    onClick: () => void;
    title?: string;
    Icon?: () => ReactElement;
};

const StyledButton = styled.button`
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background: white;
  box-shadow: 0 0.5px 1px 0 rgba(0, 0, 0, 0.5);
  height: 25px;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`


const Button: React.FC<Props> = ({onClick, Icon, title}) => {
    return (
        <StyledButton onClick={() => onClick()}>
            <TitleWrapper>
                {Icon && <IconWrapper><Icon/></IconWrapper>}
                {title && <div>{title}</div>}
            </TitleWrapper>
        </StyledButton>
    );
};

export default Button;
