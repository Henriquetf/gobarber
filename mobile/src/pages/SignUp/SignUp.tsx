import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import logoImg from '../../assets/logo.png';

import FeatherIcon from '../../components/FeatherIcon';
import Input from '../../components/Input';

import {
  Container,
  Title,
  Button,
  GoBackButton,
  GoBackButtonButtonText,
} from './SignUp.styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  function handlePressGoBack() {
    navigation.navigate<'SignIn'>('SignIn');
  }

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

          <Input name="email" icon="user" placeholder="Nome" />
          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="password" icon="lock" placeholder="Senha" />

          <Button onPress={() => {}}>Cadastrar</Button>
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
