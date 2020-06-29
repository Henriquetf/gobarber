import React from 'react';

import { ButtonContainer } from './styles';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <ButtonContainer type="button" {...rest}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
