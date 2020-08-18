import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import Text from '../Text';

export const Container = styled(RectButton)`
  min-height: 60px;

  justify-content: center;
  align-items: center;

  background: #ff9000;

  border-radius: 10px;
  padding: 16px;
`;

export const ButtonText = styled(Text)`
  color: #312e38;

  font-size: 14px;
`;
