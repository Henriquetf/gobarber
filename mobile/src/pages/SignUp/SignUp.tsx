import { useNavigation } from '@react-navigation/native';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useRef, useCallback } from 'react';
import {
  Alert,
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.png';

import FeatherIcon from '../../components/FeatherIcon';
import Input from '../../components/Input';

import { signUp } from '../../services/api/users';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Title,
  Button,
  GoBackButton,
  GoBackButtonButtonText,
} from './SignUp.styles';

const signUpSchema = Yup.object()
  .required()
  .shape({
    name: Yup.string().required('Nome obrigatório'),
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    password: Yup.string()
      .min(6, 'A senha deve conter no mínimo 6 dígitos')
      .required(),
  });

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  function handlePressGoBack() {
    navigation.navigate<'SignIn'>('SignIn');
  }

  const handleSubmitForm = useCallback<SubmitHandler>(
    async (data: Record<string, unknown>) => {
      try {
        const signUpData = await signUpSchema.validate(data, {
          abortEarly: false,
        });

        formRef.current?.setErrors([]);

        await signUp(signUpData);

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          Alert.alert(
            'Erro na autenticação',
            'Ocorreu um erro ao fazer login, verifique as credenciais.',
          );
        }
      }
    },
    [navigation],
  );

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
          <Image source={logoImg} />

          <View>
            <Title>Crie sua conta</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmitForm}>
            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <Input
              ref={emailInputRef}
              name="email"
              icon="mail"
              placeholder="E-mail"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
              textContentType="newPassword"
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Form>
        </Container>

        <GoBackButton onPress={handlePressGoBack} activeOpacity={0.6}>
          <FeatherIcon name="arrow-left" size={20} color="#FFF" />
          <GoBackButtonButtonText>Voltar para o login</GoBackButtonButtonText>
        </GoBackButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
