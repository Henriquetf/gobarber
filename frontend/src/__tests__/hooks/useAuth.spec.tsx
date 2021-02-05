import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';

import { AuthProvider, useAuth } from '../../context/AuthContext';
import api from '../../services/api/api';

const apimock = new MockAdapter(api);

describe('useAuth hook', () => {
  it('should be able to sign in', async () => {
    const localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');

    const email = 'provider.gobarber@gobarber.com.br';
    const user = {
      id: 'user-id-1234567890',
      name: 'Provider',
      email,
    };
    const token = 'token-000111222333';

    apimock.onPost('sessions').reply(200, {
      user,
      token,
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user).toBeFalsy();

    await act(() =>
      result.current.signIn({
        email,
        password: '12345678',
      }),
    );

    expect(result.current.user?.email).toBe(email);

    expect(localStorageSpy).toHaveBeenCalledWith('@GoBarber:user', JSON.stringify(user));
    expect(localStorageSpy).toHaveBeenCalledWith('@GoBarber:token', JSON.stringify(token));
  });

  it('should restore saved data from storage when auth inits', () => {
    const email = 'restore.provider.gobarber@gobarber.com.br';

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'restore-token-0001';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'restore-user-id',
            name: 'Restore Provider',
            email,
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user?.email).toEqual(email);
  });

  it('should be able to sign out', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'sign-out-token-0001';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'sign-out-user-id',
            name: 'sign-out Provider',
            email: 'sign-out.provider.gobarber@gobarber.com.br',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => result.current.signOut());

    expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:token');
    expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:user');
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', async () => {
    const user = {
      id: 'update-user-id',
      name: 'Update Provider',
      email: 'update.provider.gobarber@gobarber.com.br',
      avatarUrl: 'image.png',
    };

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => result.current.updateUser(user));

    expect(setItemSpy).toBeCalledWith('@GoBarber:user', JSON.stringify(user));
    expect(result.current.user).toEqual(user);
  });
});
