import React from 'react';
import * as FeatherIcons from 'react-feather';

import logoImg from '../../assets/img/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" height={134} />

        <form>
          <Input
            name="name"
            type="text"
            placeholder="Nome"
            icon={FeatherIcons.User}
          />
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

          <Button type="submit">Cadastrar</Button>
        </form>

        <a href="">
          <FeatherIcons.ArrowLeft size={16} />
          <span>Voltar para logon</span>
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignUp;
