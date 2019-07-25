import React from 'react';
import { AppProps, Container } from 'next/app';

import { AppStyle } from '../components/AppStyle';
import { Viewport } from '../components/Viewport';
import { ThemeProvider } from '../components/Theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <ThemeProvider>
        <Viewport>
          <AppStyle />
          <Component {...pageProps} />
        </Viewport>
      </ThemeProvider>
    </Container>
  );
}
