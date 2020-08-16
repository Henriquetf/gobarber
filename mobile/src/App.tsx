import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
