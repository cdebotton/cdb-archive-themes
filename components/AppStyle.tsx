import { createGlobalStyle, css } from 'styled-components';
import { normalize, transparentize, rem } from 'polished';

import { Theme } from './Theme';

export const AppStyle = createGlobalStyle<{ theme: Theme }>`
  ${normalize()};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ::selection {
    background-color: ${transparentize(0.1, 'magenta')};
    color: #fff;
  }

  img {
    user-select: none;
  }

  body {
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: calc(${rem(12)} + 0.35vw);
    line-height: 1.4;
    
    ${({ theme }) => {
      switch (theme.mode) {
        case 'light':
          return css`
            color: #1f1f1f;
            background-color: #fff;
          `;
        case 'dark':
          return css`
            color: #fff;
            background-color: #1f1f1f;
          `;
      }
    }}
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-rendering: optimizeLegibility;
    max-width: 40ch;
    line-height: 1;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
