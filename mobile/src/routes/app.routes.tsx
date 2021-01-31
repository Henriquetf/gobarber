import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';

import AppointmentCreated from '../pages/AppointmentCreated';
import CreateAppointment from '../pages/CreateAppointment';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <AppStack.Screen name="Dashboard" component={Dashboard} />
    <AppStack.Screen name="CreateAppointment" component={CreateAppointment} />
    <AppStack.Screen name="AppointmentCreated" component={AppointmentCreated} />

    <AppStack.Screen name="Profile" component={Profile} />
  </AppStack.Navigator>
);

export default AppRoutes;
