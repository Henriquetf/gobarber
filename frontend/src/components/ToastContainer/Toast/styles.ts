import { animated } from 'react-spring';
import styled, { css } from 'styled-components';

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,

  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,

  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

interface ContainerProps {
  type?: keyof typeof toastTypeVariations;
}

export const Container = styled(animated.div)<ContainerProps>`
  display: flex;
  align-items: center;

  position: relative;

  width: 100%;
  max-width: 400px;

  padding: 8px;

  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  ${(props) => toastTypeVariations[props.type || 'info']}

  & + div {
    margin-top: 8px;
  }

  > svg {
    margin-left: 8px;
  }

  button {
    display: flex;
    align-self: flex-start;

    position: relative;
    padding: 12px;

    background: transparent;
    color: inherit;
  }
`;

export const ToastContent = styled.div`
  flex: 1;

  margin: 8px;
  margin-left: 16px;

  strong {
    line-height: 24px;
  }

  p {
    margin-top: 4px;
    opacity: 0.9;

    font-size: 14px;
    line-height: 20px;
  }
`;
