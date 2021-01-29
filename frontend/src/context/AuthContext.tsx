import React, { useCallback, useEffect, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import api from '../services/api/api';

import { authenticate } from '../services/api/sessions';
import createCtx from './createCtx';

interface User {
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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    api.defaults.headers.authorization = token ? `Bearer ${token}` : undefined;

    setIsSetupComplete(true);
  }, [token]);

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
      {isSetupComplete ? children : null}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
