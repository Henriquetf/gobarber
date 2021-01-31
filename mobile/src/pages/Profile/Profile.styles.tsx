import styled from 'styled-components/native';

import DefaultButton from '../../components/Button';

import Text from '../../components/Text';
import { RobotoSlabMedium } from '../../styles/fonts/RobotoSlab';

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;

  padding: 40px;
`;

export const Title = styled(Text)`
  color: #f4ede8;

  font-size: 20px;
  ${RobotoSlabMedium}

  margin: 24px 0 24px;
`;

export const Button = styled(DefaultButton)`
  margin-top: 8px;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
`;

export const BackButton = styled.TouchableOpacity`
  align-self: flex-start;
`;
