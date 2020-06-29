import React from 'react';
import { Icon as FeatherIcon } from 'react-feather';

import { Container } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: FeatherIcon;
  name: string;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {
  return (
    <Container>
      {Icon && <Icon size={16} />}
      <input {...rest} />
    </Container>
  );
};

export default Input;
