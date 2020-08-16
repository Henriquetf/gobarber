import React from 'react';
import { Image } from 'react-native';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';

import { Container, Title, Button } from './SignIn.styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu login</Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button onPress={() => {}}>Entrar</Button>
    </Container>
  );
};

export default SignIn;
