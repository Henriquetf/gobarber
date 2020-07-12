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

interface ToastProps {
  type?: keyof typeof toastTypeVariations | undefined;
}

export const Container = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
`;

export const Toast = styled.div<ToastProps>`
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
