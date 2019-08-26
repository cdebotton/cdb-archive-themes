import { createGlobalStyle } from 'styled-components/macro';
import { normalize, transparentize, rem, modularScale, em } from 'polished';

export const AppStyle = createGlobalStyle`
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-rendering: optimizeLegibility;
    max-width: 40ch;
  }

  p {
    max-width: 60ch;
    font-size: ${modularScale(1)};
    margin: 0;

    & + p {
      margin-top: ${em(5)};
    }
  }
`;
