import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../context/AuthContext';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#312e38',
        }}
      >
        <ActivityIndicator size="large" color="#f4ede8" />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
