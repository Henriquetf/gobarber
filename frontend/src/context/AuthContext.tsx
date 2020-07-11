import React, { useCallback, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import api from '../services/api';

import createCtx from './createCtx';

type User = Record<string, unknown>;

interface AuthStorage {
  token: string | null;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextShape {
  user: User;
  isLoading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const [useAuthContext, AuthContext] = createCtx<AuthContextShape>();

const AuthProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [authData, setAuthData, removeAuthData] = useLocalStorage<AuthStorage>(
    'auth',
    {
      token: null,
      user: {},
    },
  );

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      setIsLoading(true);

      try {
        const response = await api.post('sessions', {
          email,
          password,
        });

        setAuthData({
          token: response.data.token,
          user: response.data.user,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setAuthData],
  );

  const signOut = useCallback(() => {
    removeAuthData();
  }, [removeAuthData]);

  return (
    <AuthContext.Provider
      value={{ user: authData.user, signIn, signOut, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthProvider };
