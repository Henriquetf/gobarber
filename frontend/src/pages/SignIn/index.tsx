import React from 'react';
import * as FeatherIcons from 'react-feather';

import logoImg from '../../assets/img/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" height={134} />

        <form>
          <h1>Faça seu logon</h1>

          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            icon={FeatherIcons.Mail}
          />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            icon={FeatherIcons.Lock}
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot-password">Esqueci minha senha</a>
        </form>

        <a href="">
          <FeatherIcons.LogIn size={16} />
          <span>Criar conta</span>
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
