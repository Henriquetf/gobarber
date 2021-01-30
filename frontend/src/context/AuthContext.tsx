import React, { useCallback, useEffect, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import api from '../services/api/api';

import { authenticate } from '../services/api/sessions';
import createCtx from './createCtx';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
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
  updateUser(user: User): void;
}

const [useAuth, AuthContext] = createCtx<AuthContextShape>();

const AuthProvider: React.FC = ({ children }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken, removeToken] = useLocalStorage<string | undefined>('token', undefined);
  const [user, setUser, removeUser] = useLocalStorage<User | undefined>('user', undefined);

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      setIsLoading(true);

      try {
        const authData = await authenticate({ email, password });

        setToken(authData.token);
        setUser(authData.user);
      } finally {
        setIsLoading(false);
      }
    },
    [setToken, setUser],
  );

  const signOut = useCallback(() => {
    removeToken();
    removeUser();
  }, [removeToken, removeUser]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    api.defaults.headers.authorization = token ? `Bearer ${token}` : undefined;

    setIsSetupComplete(true);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        signIn,
        signOut,
        updateUser: setUser,
      }}
    >
      {isSetupComplete ? children : null}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
