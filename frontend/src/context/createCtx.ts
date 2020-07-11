import { createContext, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
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
