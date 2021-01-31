import React, { useCallback, useEffect, useState } from 'react';

import useAsyncStorage from '../hooks/useAsyncStorage';
import api from '../services/api/api';

import { authenticate } from '../services/api/sessions';
import createCtx from './createCtx';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextShape {
  user?: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const [useAuth, AuthContext] = createCtx<AuthContextShape>();

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken, removeToken, isLoadingToken] = useAsyncStorage<
    string | undefined
  >('token', undefined);
  const [user, setUser, removeUser, isLoadingUser] = useAsyncStorage<
    User | undefined
  >('user', undefined);

  const isLoading = isLoadingToken || isLoadingUser;

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      const { data } = await authenticate({ email, password });

      await Promise.all([setToken(data.token), setUser(data.user)]);
    },
    [setToken, setUser],
  );

  const signOut = useCallback(async () => {
    await Promise.all([removeToken(), removeUser()]);
  }, [removeToken, removeUser]);

  useEffect(() => {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        signIn,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
