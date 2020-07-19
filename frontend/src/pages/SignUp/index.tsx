import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import * as FeatherIcons from 'react-feather';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import logoImg from '../../assets/img/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'A senha deve conter no mínimo 6 dígitos'),
});

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: Record<string, unknown>) => {
    try {
      await signUpSchema.validate(data, {
        abortEarly: false,
      });

      formRef.current?.setErrors([]);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" height={134} />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

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
        </Form>

        <Link to="/">
          <FeatherIcons.ArrowLeft size={20} />
          <span>Voltar para logon</span>
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignUp;
