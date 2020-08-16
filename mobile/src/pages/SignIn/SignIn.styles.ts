import styled from 'styled-components/native';

import DefaultButton from '../../components/Button';

import Text from '../../components/Text';

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;

  padding: 40px;
`;

export const Title = styled(Text)`
  color: #f4ede8;

  font-size: 20px;

  margin: 64px 0 24px;
`;

export const Button = styled(DefaultButton)`
  margin-top: 8px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin: 16px 0;
  padding: 8px;
`;

export const ForgotPasswordText = styled(Text)`
  color: #f4ede8;

  font-size: 14px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  align-self: stretch;

  height: 60px;

  border-top-width: 1px;
  border-top-color: #232129;
`;

export const CreateAccountButtonText = styled(Text)`
  color: #ff9000;

  margin-left: 16px;

  font-size: 14px;
`;
