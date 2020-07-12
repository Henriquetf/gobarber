import React from 'react';

import { AlertCircle, XCircle } from 'react-feather';

import { Container, Toast, ToastContent } from './styles';

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast>
        <AlertCircle />

        <ToastContent>
          <strong>Info</strong>
        </ToastContent>

        <button type="button">
          <XCircle size={20} />
        </button>
      </Toast>

      <Toast type="success">
        <AlertCircle />

        <ToastContent>
          <strong>Sucesso</strong>
        </ToastContent>

        <button type="button">
          <XCircle size={20} />
        </button>
      </Toast>

      <Toast type="error">
        <AlertCircle />

        <ToastContent>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login na aplicação</p>
        </ToastContent>

        <button type="button">
          <XCircle size={20} />
        </button>
      </Toast>
    </Container>
  );
};

export default ToastContainer;
