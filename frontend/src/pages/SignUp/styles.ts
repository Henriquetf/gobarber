import { shade } from 'polished';
import styled from 'styled-components';

import signUpBackgroundImg from '../../assets/img/sign-up-background.png';

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  align-items: stretch;
  justify-content: center;
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 36px 18px;
  width: 100%;
  max-width: 660px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 80px 0;
    width: 100%;
    max-width: 340px;

    h1 {
      margin-bottom: 24px;

      color: #f4ede8;

      font-size: 1.5rem;
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

  > a {
    display: flex;
    align-items: center;

    color: #ff9000;

    &:hover,
    &:focus,
    &:active {
      color: ${shade(0.2, '#ff9000')};
    }

    span {
      margin-left: 16px;
    }
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Background = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: url(${signUpBackgroundImg}) center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  filter: opacity(0.02);
`;
