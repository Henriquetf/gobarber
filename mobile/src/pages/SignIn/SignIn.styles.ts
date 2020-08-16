import styled from 'styled-components/native';

import DefaultButton from '../../components/Button';

import { RobotoSlabRegular } from '../../styles/fonts/RobotoSlab';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 40px;
`;

export const Title = styled.Text`
  color: #f4ede8;

  font-size: 20px;
  ${RobotoSlabRegular}

  margin: 64px 0 24px;
`;

export const Button = styled(DefaultButton)`
  margin-top: 8px;
`;
