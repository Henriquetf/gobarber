import React, { useCallback, useState } from 'react';

import api from '../services/api';

import createCtx from './createCtx';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextShape {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  isLoading: boolean;
}

const [useAuthContext, AuthContext] = createCtx<AuthContextShape>();

const AuthProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    setIsLoading(true);

    try {
      const response = await api.post('sessions', {
        email,
        password,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'blobman', signIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthProvider };
