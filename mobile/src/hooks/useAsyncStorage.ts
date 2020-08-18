import AsyncStorage from '@react-native-community/async-storage';
import { useState, useCallback, useEffect } from 'react';

const localStoragePrefix = '@GoBarber';

export default function useLocalStorage<T>(key: string, initialState: T) {
  const keyWithPrefix = `${localStoragePrefix}:${key}`;

  const [state, setState] = useState<T>();

  useEffect(() => {
    async function loadStoredData(): Promise<void> {
      const storedData = await AsyncStorage.getItem(keyWithPrefix);

      if (storedData) {
        setState(JSON.parse(storedData));
      }
    }

    loadStoredData();
  }, [keyWithPrefix]);

  const setLocalStorageState = useCallback(
    (value: T) => {
      setState(value);

      return AsyncStorage.setItem(keyWithPrefix, JSON.stringify(value));
    },
    [keyWithPrefix],
  );

  const removeLocalStorageState = useCallback(() => {
    setState(initialState);

    return AsyncStorage.removeItem(keyWithPrefix);
  }, [initialState, keyWithPrefix]);

  return [state, setLocalStorageState, removeLocalStorageState] as const;
}
