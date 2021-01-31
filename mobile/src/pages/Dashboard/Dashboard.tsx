import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons';

import FeatherIcon from '../../components/FeatherIcon';

import { useAuth } from '../../context/AuthContext';
import api from '../../services/api/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  HeaderContent,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle,
} from './Dashboard.styles';

import { Provider } from './types';

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>();

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderTitle>Bem vindo,</HeaderTitle>
          <UserName>{user?.name}</UserName>
        </HeaderContent>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user?.avatarUrl }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        data={providers}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={{ uri: provider.avatarUrl }} />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <FeatherIcon name="calendar" size={14} color="#FF9000" />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <FeatherIcon name="clock" size={14} color="#FF9000" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
        keyExtractor={(provider) => provider.id}
      />
    </Container>
  );
};

export default Dashboard;
