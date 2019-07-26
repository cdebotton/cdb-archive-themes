import React from 'react';
import { AppProps, Container } from 'next/app';
import Head from 'next/head';

import { AppStyle } from '../components/AppStyle';
import { Viewport } from '../components/Viewport';
import { ThemeProvider } from '../components/Theme';
import { SocialAppBar } from '../components/SocialAppBar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Head>
        <title>Christian de Botton</title>
      </Head>
      <ThemeProvider>
        <Viewport>
          <AppStyle />
          <Component {...pageProps} />
          <SocialAppBar css="position: fixed; bottom: 0; right: 0;" />
        </Viewport>
      </ThemeProvider>
    </Container>
  );
}
