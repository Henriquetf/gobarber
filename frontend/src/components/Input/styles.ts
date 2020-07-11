import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;

  background: #232129;
  border: 2px solid #232129;
  border-radius: 10px;

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-left: 18px;

    ${(props) =>
      (props.isFocused || props.isFilled) &&
      css`
        color: #ff9000;
      `}
  }

  input {
    flex: 1;

    color: #f4ede8;
    background: inherit;
    font-size: 1rem;
    padding: 0 18px;
    outline: 0;

    height: 56px;
    width: 100%;

    &::placeholder {
      color: #666360;
    }
  }
`;
