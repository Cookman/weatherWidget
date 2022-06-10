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
`

const Button: React.FC<Props> = ({onClick, Icon, title}) => {
    return (
        <StyledButton onClick={() => onClick()}>{Icon && <Icon/>}{title}</StyledButton>
    );
};

export default Button;
