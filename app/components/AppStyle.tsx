import { createGlobalStyle, ThemedStyledProps } from 'styled-components';
import { normalize, transparentize, rem } from 'polished';

import { Theme } from './Theme';

function getBackgroundColor({ theme }: ThemedStyledProps<unknown, Theme>) {
  switch (theme.mode) {
    case 'dark':
      return '#1f1f1f';
    case 'light':
      return '#efefef';
  }
}

function getColor({ theme }: ThemedStyledProps<unknown, Theme>) {
  switch (theme.mode) {
    case 'dark':
      return '#efefef';
    case 'light':
      return '#1f1f1f';
  }
}

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
    color: ${getColor};
    background-color: ${getBackgroundColor};
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

  p {
    max-width: 60ch;
  }
  
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
