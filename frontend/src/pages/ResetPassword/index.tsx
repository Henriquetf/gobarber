import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import * as Fi from 'react-feather';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import logoImg from '../../assets/img/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { useToast } from '../../context/ToastContext';
import useQueryParam from '../../hooks/useQueryParam';
import { resetPassword } from '../../services/api/users';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

const resetPasswordSchema = Yup.object()
  .required()
  .shape({
    password: Yup.string().required('Digite uma senha'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'A confirmação de senha não corresponde à senha.')
      .required('Digite a confirmação de senha'),
  });

const ResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();
  const token = useQueryParam('token');

  const handleSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      if (isLoading) {
        return;
      }

      try {
        setIsLoading(true);

        const resetPasswordData = await resetPasswordSchema.validate(data, {
          abortEarly: false,
        });

        formRef.current?.setErrors([]);

        if (!token) {
          throw new Error();
        }

        await resetPassword({
          ...resetPasswordData,
          token,
        });

        history.push('/signin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro ao resetar senha',
            description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, addToast, history, token],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" height={134} />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resetar senha</h1>

          <Input name="password" type="password" placeholder="Nova senha" icon={Fi.Lock} />
          <Input
            name="password_confirmation"
            type="password"
            placeholder="Confirmação da senha"
            icon={Fi.Lock}
          />

          <Button loading={isLoading} type="submit">
            Alterar senha
          </Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
