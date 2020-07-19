import React from 'react';

import { AlertCircle, XCircle } from 'react-feather';

import Toast from './Toast';
import { Container } from './styles';

const ToastContainer: React.FC = () => {

  return (
    <Container>
      {messages.map((message) => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
