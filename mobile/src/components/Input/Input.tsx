import React from 'react';
import { TextInputProps } from 'react-native';

import FeatherIcon, { FeatherGlyphs } from '../FeatherIcon';
import { Container, TextInput } from './Input.styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: FeatherGlyphs;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      <FeatherIcon name={icon} size={20} color="#666360" />
      <TextInput
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        {...rest}
      />
    </Container>
  );
};

export default Input;
