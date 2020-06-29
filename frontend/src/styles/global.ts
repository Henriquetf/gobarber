import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: #312e38;
    color: #f4ede8;
    --webkit-font-smoothing: antialiased;
  }

  body,
  input,
  button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  input,
  button {
    border: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
