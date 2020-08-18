import { useField } from '@unform/core';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { TextInputProps, TextInput as RNTextInput } from 'react-native';

import FeatherIcon, { FeatherGlyphs } from '../FeatherIcon';
import { Container, TextInput } from './Input.styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: FeatherGlyphs;
}

interface InputValueReference {
  value: string;
}
const Input = React.forwardRef<RNTextInput, InputProps>(
  ({ name, icon, ...rest }, ref) => {
    const { registerField, defaultValue, fieldName, error } = useField(name);

    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
      registerField<string>({
        name: fieldName,
        ref: inputValueRef.current,
        path: 'value',
      });
    }, [registerField, fieldName]);

    const handleChangeText = useCallback((value) => {
      inputValueRef.current.value = value;
    }, []);

    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
      setIsFocused(false);

      setIsFilled(Boolean(inputValueRef.current.value));
    }, []);

    return (
      <Container isFocused={isFocused} hasError={Boolean(error)}>
        <FeatherIcon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#ff9000' : '#666360'}
        />
        <TextInput
          ref={ref}
          placeholderTextColor="#666360"
          keyboardAppearance="dark"
          defaultValue={defaultValue}
          onChangeText={handleChangeText}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        />
      </Container>
    );
  },
);

export default Input;
