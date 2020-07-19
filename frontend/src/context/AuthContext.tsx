import React, { useCallback, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

import { authenticate } from '../services/api/sessions';
import createCtx from './createCtx';

type User = Record<string, unknown>;

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
  const [isLoading, setIsLoading] = useState(false);

  const [, setToken, removeToken] = useLocalStorage<string | undefined>(
    'token',
    undefined,
  );
  const [user, setUser, removeUser] = useLocalStorage<User | undefined>(
    'user',
    undefined,
  );

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      setIsLoading(true);

      try {
        const { data } = await authenticate({ email, password });

        setToken(data.token);
        setUser(data.user);
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
