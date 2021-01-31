import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppProvider from './context/AppProvider';
import Routes from './routes';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#312e38' }}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#312e38" />

        <AppProvider>
          <Routes />
        </AppProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
