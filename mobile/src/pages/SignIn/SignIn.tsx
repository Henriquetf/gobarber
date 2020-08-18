import { useNavigation } from '@react-navigation/native';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
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
import { useAuth } from '../../context/AuthContext';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Title,
  Button,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './SignIn.styles';

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
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const { signIn, user } = useAuth();

  function handlePressCreateAccount() {
    navigation.navigate<'SignUp'>('SignUp');
  }

  const handleSubmitForm = useCallback<SubmitHandler>(
    async (data: Record<string, unknown>) => {
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
          Alert.alert(
            'Erro na autenticação',
            'Ocorreu um erro ao fazer login, verifique as credenciais.',
          );
        }
      }
    },
    [signIn],
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
            <Title>Faça seu login</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmitForm}>
            <Input
              name="email"
              icon="mail"
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
              secureTextEntry
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
          </Form>

          <ForgotPassword onPress={() => {}}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>

        <CreateAccountButton
          onPress={handlePressCreateAccount}
          activeOpacity={0.6}
        >
          <FeatherIcon name="log-in" size={20} color="#FF9000" />
          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
