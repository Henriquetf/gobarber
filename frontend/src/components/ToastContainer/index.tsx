import React from 'react';

import { useToast } from '../../context/ToastContext';

import Toast from './Toast';
import { Container } from './styles';

const ToastContainer: React.FC = () => {
  const { messages } = useToast();

  return (
    <Container>
      {messages.map((message) => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
