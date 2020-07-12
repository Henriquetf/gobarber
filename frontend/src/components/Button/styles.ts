import { shade } from 'polished';
import styled from 'styled-components';

export const ButtonContainer = styled.button`
  width: 100%;
  height: 56px;
  margin-top: 24px;
  border-radius: 10px;

  color: #312e38;
  background: #ff9000;

  font-weight: 500;

  transition: background-color 0.2s ease-in-out;

  &:not(:disabled) {
    &:hover,
    &:focus {
      background: ${shade(0.2, '#ff9000')};
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
