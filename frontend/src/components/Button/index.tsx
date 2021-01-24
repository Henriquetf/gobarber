import React from 'react';
import * as FeatherIcons from 'react-feather';

import { ButtonContainer } from './styles';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, disabled, ...rest }) => {
  return (
    <ButtonContainer type="button" disabled={Boolean(loading) || disabled} {...rest}>
      {loading ? <FeatherIcons.Loader /> : children}
    </ButtonContainer>
  );
};

export default Button;
