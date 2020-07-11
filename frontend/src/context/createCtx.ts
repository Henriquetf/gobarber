import { createContext, useContext } from 'react';

export default function createCtx<ContextShape>() {
  const context = createContext<ContextShape | undefined>(undefined);

  function useCtx(): ContextShape {
    const contextValue = useContext(context);

    if (contextValue === undefined) {
      throw new Error('useCtx must be inside a Provider with a value');
    }

    return contextValue;
  }

  return [useCtx, context] as const;
}
