import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import * as Fi from 'react-feather';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import logoImg from '../../assets/img/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { useToast } from '../../context/ToastContext';

import { signUp } from '../../services/api/users';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

const signUpSchema = Yup.object()
  .required()
  .shape({
    name: Yup.string().required('Nome obrigatório'),
    email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
    password: Yup.string().min(6, 'A senha deve conter no mínimo 6 dígitos').required(),
  });

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        const signUpData = await signUpSchema.validate(data, {
          abortEarly: false,
        });

        formRef.current?.setErrors([]);

        await signUp(signUpData);

        history.push('/signin');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu logon no GoBarber.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
          });
        }
      }
    },
    [history, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" height={134} />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" type="text" placeholder="Nome" icon={Fi.User} />
          <Input name="email" type="email" placeholder="E-mail" icon={Fi.Mail} />
          <Input name="password" type="password" placeholder="Senha" icon={Fi.Lock} />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/signin">
          <Fi.ArrowLeft size={20} />
          <span>Voltar para logon</span>
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignUp;
