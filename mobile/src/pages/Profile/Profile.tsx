import { useNavigation } from '@react-navigation/native';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import {
  Alert,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import * as Yup from 'yup';

import FeatherIcon from '../../components/FeatherIcon';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api/api';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Title,
  Button,
  UserAvatarButton,
  UserAvatar,
  BackButton,
} from './Profile.styles';

const profileSchema = Yup.object()
  .required()
  .shape({
    name: Yup.string().required('Nome obrigatório'),
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    password: Yup.string().required('Informe a senha atual'),
    newPassword: Yup.string().when({
      is: (value: string) => value.length > 0,
      then: Yup.string().min(6, 'A nova senha deve conter no mínimo 6 dígitos'),
    }),
  });

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const { user } = useAuth();

  const handleSubmitForm = useCallback<SubmitHandler>(
    async (data: Record<string, unknown>) => {
      try {
        const profileData = await profileSchema.validate(data, {
          abortEarly: false,
        });

        formRef.current?.setErrors([]);

        await api.put('/profile', profileData);

        Alert.alert(
          'Perfil atualizado com sucesso.',
          'Você já pode fazer login na aplicação.',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          Alert.alert(
            'Erro na atualização do perfil',
            'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
          );
        }
      }
    },
    [navigation],
  );

  const handleGoBack = useCallback<SubmitHandler>(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <BackButton onPress={handleGoBack}>
            <FeatherIcon name="chevron-left" size={24} color="#999591" />
          </BackButton>

          <UserAvatarButton>
            <UserAvatar source={{ uri: user?.avatarUrl }} />
          </UserAvatarButton>

          <View>
            <Title>Meu perfil</Title>
          </View>

          <Form initialData={user} ref={formRef} onSubmit={handleSubmitForm}>
            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              autoCorrect={false}
              autoCapitalize="words"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
            <Input
              ref={emailInputRef}
              name="email"
              icon="mail"
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <View style={{ height: 16 }} />

            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Senha atual"
              returnKeyType="send"
              onSubmitEditing={() => newPasswordInputRef.current?.focus()}
              secureTextEntry
            />
            <Input
              ref={newPasswordInputRef}
              name="newPassword"
              icon="lock"
              placeholder="Nova senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
              secureTextEntry
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Confirmar mudanças
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
