import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import * as FeatherIcons from 'react-feather';
import * as Yup from 'yup';

import logoImg from '../../assets/img/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

const signInSchema = Yup.object()
  .required()
  .shape({
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    password: Yup.string().required('Digite uma senha'),
  });

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn, isLoading } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      if (isLoading) {
        return;
      }

      try {
        const signInData = await signInSchema.validate(data, {
          abortEarly: false,
        });

        formRef.current?.setErrors([]);

        await signIn(signInData);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description:
              'Ocorreu um erro ao fazer login, verifique as credenciais.',
          });
        }
      }
    },
    [signIn, isLoading, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" height={134} />

        <Form ref={formRef} onSubmit={handleSubmit}>
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

          <Button type="submit" disabled={isLoading}>
            {isLoading ? <FeatherIcons.Loader /> : 'Entrar'}
          </Button>

          <a href="forgot-password">Esqueci minha senha</a>
        </Form>

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
