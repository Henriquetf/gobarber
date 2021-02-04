import { useField } from '@unform/core';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as Fi from 'react-feather';

import { Container, Error, InnerInput } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: Fi.Icon;
  name: string;
  containerStyle?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({ icon: Icon, name, containerStyle, ...rest }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const field = useField(name);
  const { fieldName, error, registerField } = field;
  const defaultValue = field.defaultValue as string;

  const hasError = Boolean(error);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(Boolean(inputRef.current?.value));
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      hasError={hasError}
      isFocused={isFocused}
      isFilled={isFilled}
      style={containerStyle}
      data-testid="input-container"
    >
      {Icon && <Icon size={16} />}

      <InnerInput
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        name={name}
        {...rest}
      />

      {hasError && (
        <Error title={String(error)} color="#c53030" textColor="#ffffff">
          <Fi.AlertCircle size={20} color="#c53030" />
        </Error>
      )}
    </Container>
  );
};

export default Input;
