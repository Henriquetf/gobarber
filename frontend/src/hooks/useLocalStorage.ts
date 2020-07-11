import { useState, useCallback } from 'react';

const localStoragePrefix = '@GoBarber';

export default function useLocalStorage<T>(key: string, initialState: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const value = localStorage.getItem(`${localStoragePrefix}:${key}`);

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

      localStorage.setItem(
        `${localStoragePrefix}:${key}`,
        JSON.stringify(value),
      );
    },
    [key],
  );

  return [state, setLocalStorageState] as const;
}
