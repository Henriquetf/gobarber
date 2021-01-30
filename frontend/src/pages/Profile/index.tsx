import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import * as Fi from 'react-feather';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext';

import { useToast } from '../../context/ToastContext';
import api from '../../services/api/api';

import { updateAvatar } from '../../services/api/users';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AvatarInput, Header } from './styles';

const profileSchema = Yup.object()
  .required()
  .shape({
    name: Yup.string().required('Nome obrigatório'),
    email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
    password: Yup.string().required('Informe a senha atual'),
    newPassword: Yup.string().when({
      is: (value: string) => value.length > 0,
      then: Yup.string().min(6, 'A nova senha deve conter no mínimo 6 dígitos'),
    }),
  });

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        const profileData = await profileSchema.validate(data, {
          abortEarly: false,
        });

        formRef.current?.setErrors([]);

        const response = await api.put('/profile', data);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado',
          description: 'Suas informações do perfil foram atualizadas com sucesso.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na atualização',
            description: 'Ocorreu um erro ao atualizar o perfil, tente novamente.',
          });
        }
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAvatar = e.target.files?.[0];

      if (!newAvatar) {
        return;
      }

      updateAvatar(newAvatar)
        .then((updatedUser) => {
          updateUser(updatedUser);

          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
        })
        .catch(console.log);
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <Header>
        <div>
          <Link to="/dashboard">
            <Fi.ArrowLeft size={24} />
          </Link>
        </div>
      </Header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user?.name,
            email: user?.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user?.avatarUrl || undefined} alt={user?.name} />

            <label htmlFor="avatar">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/png,image/jpeg"
                onChange={handleAvatarChange}
              />

              <Fi.Camera size={20} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" type="text" placeholder="Nome" icon={Fi.User} />
          <Input name="email" type="email" placeholder="E-mail" icon={Fi.Mail} />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="password"
            type="password"
            placeholder="Senha atual"
            icon={Fi.Lock}
          />
          <Input name="newPassword" type="password" placeholder="Nova senha" icon={Fi.Lock} />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
