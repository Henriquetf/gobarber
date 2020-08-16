import React from 'react';
import { TextInputProps } from 'react-native';

import FeatherIcon, { FeatherGlyphs } from 'react-native-vector-icons/Feather';

import { Container, TextInput } from './Input.styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: FeatherGlyphs;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      <FeatherIcon name={icon} size={16} color="#666360" />
      <TextInput
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        {...rest}
      />
    </Container>
  );
};

export default Input;
