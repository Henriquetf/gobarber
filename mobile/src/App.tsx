import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import { StatusBar } from 'react-native';

import AppProvider from './context/AppProvider';
import Routes from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />

      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
