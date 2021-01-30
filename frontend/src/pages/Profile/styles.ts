import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  height: 144px;
  background: #28262e;

  div {
    height: 100%;
    max-width: 1120px;
    margin: 0 auto;

    display: flex;
    align-items: center;

    position: relative;

    a {
      position: absolute;

      padding: 24px 16px;

      svg {
        color: #999591;
      }
    }
  }
`;

export const Content = styled.section`
  display: flex;
  justify-content: center;

  margin-top: -93px;
  padding: 0 36px 18px 36px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 80px;
    width: 100%;
    max-width: 340px;

    h1 {
      align-self: flex-start;

      margin-bottom: 24px;
      color: #f4ede8;

      font-size: 20px;
    }

    a {
      margin-top: 24px;
      display: block;

      color: #f4ede8;

      &:hover,
      &:focus,
      &:active {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;

  display: flex;
  justify-content: center;

  img {
    width: 186px;
    height: 186px;

    border-radius: 50%;
  }

  label {
    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;
    border-radius: 50%;

    background-color: #ff9000;

    svg {
      color: #312e38;
    }

    cursor: pointer;

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
  }

  input {
    display: none;
  }
`;
