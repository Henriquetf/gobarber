import React from 'react';

import ToastContainer from '../components/ToastContainer';

import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
        <ToastContainer />
      </ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
