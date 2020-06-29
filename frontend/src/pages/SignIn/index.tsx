import React from 'react';
import {
  LogIn as FiLogIn,
  Lock as FiLock,
  Mail as FiMail,
} from 'react-feather';

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

          <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            icon={FiLock}
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot-password">Esqueci minha senha</a>
        </form>

        <a href="">
          <FiLogIn size={16} />
          <span>Criar conta</span>
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
