import React, { useCallback } from 'react';

import ToastContainer from '../components/ToastContainer';

import createCtx from './createCtx';

interface ToastContextShape {
  addToast(): void;
  removeToast(): void;
}

const [useToast, ToastContext] = createCtx<ToastContextShape>();

const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('removeToast');
  }, []);

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export { useToast, ToastProvider };
