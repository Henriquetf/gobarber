import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  align-items: center;

  background: #232129;
  border: 2px solid #232129;
  border-radius: 10px;

  ${(props) =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}

  & + div {
    margin-top: 8px;
  }

  > svg {
    margin-left: 18px;

    ${(props) =>
      (props.isFocused || props.isFilled) &&
      css`
        color: #ff9000;
      `}
  }

  input {
    flex: 1;
    min-width: 0;

    color: #f4ede8;
    background: inherit;

    font-size: 1rem;

    margin-left: 4px;
    padding-left: 14px;
    padding-right: 18px;
    outline: 0;
    border: 0;
    border-radius: 10px;

    height: 56px;
    width: 100%;

    &::placeholder {
      color: #666360;
    }
  }
`;

export const Error = styled(Tooltip)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;

  padding: 0 18px;

  cursor: pointer;

  &:hover span,
  &:active span,
  &:focus span {
    opacity: 1;
    visibility: visible;
  }
`;
