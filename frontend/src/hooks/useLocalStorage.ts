import { useState, useCallback } from 'react';

const localStoragePrefix = '@GoBarber';

export default function useLocalStorage<T>(key: string, initialState: T) {
  const keyWithPrefix = `${localStoragePrefix}:${key}`;

  const [state, setState] = useState<T>(() => {
    try {
      const value = localStorage.getItem(keyWithPrefix);

      if (value === null) {
        return initialState;
      }

      return JSON.parse(value);
    } catch {
      return initialState;
    }
  });

  const setLocalStorageState = useCallback(
    (value: T) => {
      setState(value);

      localStorage.setItem(keyWithPrefix, JSON.stringify(value));
    },
    [keyWithPrefix],
  );

  const removeLocalStorageState = useCallback(() => {
    setState(initialState);

    localStorage.removeItem(keyWithPrefix);
  }, [initialState, keyWithPrefix]);

  return [state, setLocalStorageState, removeLocalStorageState] as const;
}
