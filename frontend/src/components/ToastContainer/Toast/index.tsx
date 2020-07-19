import React, { useEffect } from 'react';
import { AlertCircle, XCircle, CheckCircle, Info } from 'react-feather';

import { useToast, ToastMessage } from '../../../context/ToastContext';
import { Container, ToastContent } from './styles';

interface ToastProps {
  message: ToastMessage;
}

const icons = {
  info: <Info size={24} />,
  error: <AlertCircle size={24} />,
  success: <CheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({
  message: { id, title, description, type },
}) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, id]);

  return (
    <Container type={type}>
      {icons[type || 'info']}

      <ToastContent>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </ToastContent>

      <button type="button" onClick={() => removeToast(id)}>
        <XCircle size={20} />
      </button>
    </Container>
  );
};

export default Toast;
