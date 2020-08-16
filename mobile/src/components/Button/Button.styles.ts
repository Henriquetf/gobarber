import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { RobotoSlabMedium } from '../../styles/fonts/RobotoSlab';

export const Container = styled(RectButton)`
  width: 100%;
  min-height: 60px;

  justify-content: center;
  align-items: center;

  background: #ff9000;

  border-radius: 10px;
  padding: 16px;
`;

export const ButtonText = styled.Text`
  color: #312e38;

  font-size: 14px;
  ${RobotoSlabMedium}
`;
