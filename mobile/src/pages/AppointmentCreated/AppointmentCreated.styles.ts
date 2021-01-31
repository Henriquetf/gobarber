import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {
  RobotoSlabMedium,
  RobotoSlabRegular,
} from '../../styles/fonts/RobotoSlab';

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;

  padding: 24px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #f4ede8;
  ${RobotoSlabMedium}

  margin-top: 48px;
  text-align: center;
`;

export const Description = styled.Text`
  color: #999591;
  margin-top: 16px;

  font-size: 18px;
  ${RobotoSlabRegular}
`;

export const OkButton = styled(RectButton)`
  background: #ff9000;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 24px;
  padding: 12px 24px;
`;

export const OkButtonText = styled.Text`
  color: #312e38;

  text-align: center;
  font-size: 18px;
  ${RobotoSlabMedium}
`;
