import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import * as FeatherIcons from 'react-feather';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import logoImg from '../../assets/img/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { useToast } from '../../context/ToastContext';
import { forgotPassword } from '../../services/api/users';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

const forgotPasswordSchema = Yup.object()
  .required()
  .shape({
    email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
  });

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      if (isLoading) {
        return;
      }

      try {
        setIsLoading(true);

        const signInData = await forgotPasswordSchema.validate(data, {
          abortEarly: false,
        });

        formRef.current?.setErrors([]);

        await forgotPassword(signInData.email);

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na recuperação de senha',
            description:
              'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" height={134} />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar senha</h1>

          <Input name="email" type="email" placeholder="E-mail" icon={FeatherIcons.Mail} />

          <Button loading={isLoading} type="submit">
            Recuperar
          </Button>
        </Form>

        <Link to="/signin">
          <FeatherIcons.LogIn size={16} />
          <span>Voltar ao login</span>
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
