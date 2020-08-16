import styled from 'styled-components/native';

import { RobotoSlabMedium } from '../../styles/fonts/RobotoSlab';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;
  min-height: 50px;

  border-radius: 10px;
  margin-bottom: 8px;
  padding-left: 20px;

  overflow: hidden;

  background: #232129;
`;

export const TextInput = styled.TextInput`
  color: #fff;

  flex: 1;

  padding: 0 20px;

  font-size: 14px;
  ${RobotoSlabMedium}
`;
