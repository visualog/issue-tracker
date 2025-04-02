import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    background-color: ${theme.colors.background};
    color: ${theme.colors.dark};
    line-height: 1.5;
  }

  .app-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: ${theme.spacing.md};
  }

  .main-content {
    margin-top: ${theme.spacing.lg};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    cursor: pointer;
  }
`; 