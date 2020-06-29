import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  background: #232129;
  border: 2px solid #232129;
  border-radius: 10px;

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-left: 18px;
  }

  input {
    flex: 1;

    color: #f4ede8;
    background: inherit;
    font-size: 1rem;
    padding: 0 18px;

    height: 56px;
    width: 100%;

    &::placeholder {
      color: #666360;
    }
  }
`;
