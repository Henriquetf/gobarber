import React from 'react';
import { useTransition } from 'react-spring';

import { useToast } from '../../context/ToastContext';

import Toast from './Toast';
import { Container } from './styles';

const ToastContainer: React.FC = () => {
  const { messages } = useToast();

  const messagesWithTransition = useTransition(messages, (message) => message.id, {
    from: {
      right: '-120%',
      opacity: 0,
    },
    enter: {
      right: '0%',
      opacity: 1,
    },
    leave: {
      right: '-120%',
      opacity: 0,
    },
  });

  return (
    <Container>
      {messagesWithTransition.map(({ item: message, key, props }) => (
        <Toast key={key} message={message} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
