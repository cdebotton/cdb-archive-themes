import React from 'react';
import { AppProps, Container } from 'next/app';

import { AppStyle } from '../components/AppStyle';
import { Viewport } from '../components/Viewport';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Viewport>
        <AppStyle />
        <Component {...pageProps} />
      </Viewport>
    </Container>
  );
}
