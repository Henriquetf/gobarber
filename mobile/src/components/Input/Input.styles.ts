import styled, { css } from 'styled-components/native';

import { RobotoSlabMedium } from '../../styles/fonts/RobotoSlab';

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;

  width: 100%;
  min-height: 50px;

  border-width: 2px;
  border-color: #232129;
  border-radius: 10px;

  margin-bottom: 8px;
  padding-left: 18px;

  overflow: hidden;

  background: #232129;

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
`;

export const TextInput = styled.TextInput`
  color: #fff;

  flex: 1;

  padding: 0 20px;

  font-size: 14px;
  ${RobotoSlabMedium}
`;
