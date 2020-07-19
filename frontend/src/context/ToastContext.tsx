import React, { useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import createCtx from './createCtx';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

type AddToastFunction = (message: Omit<ToastMessage, 'id'>) => void;
type RemoveToastFunction = (id: string) => void;

interface ToastContextShape {
  addToast: AddToastFunction;
  removeToast: RemoveToastFunction;
  messages: ToastMessage[];
}

const [useToast, ToastContext] = createCtx<ToastContextShape>();

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback<AddToastFunction>((message) => {
    const newToast: ToastMessage = {
      id: uuid(),
      ...message,
    };

    setMessages((prevMessages) => [...prevMessages, newToast]);
  }, []);

  const removeToast = useCallback<RemoveToastFunction>((id) => {
    setMessages((prevMessages) => prevMessages.filter((m) => m.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
        messages,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export { useToast, ToastProvider };
