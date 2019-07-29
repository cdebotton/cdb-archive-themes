import React from 'react';
import { Container, AppProps } from 'next/app';
import Head from 'next/head';
import { css } from 'styled-components';

import { AppStyle } from '../components/AppStyle';
import { Viewport } from '../components/Viewport';
import { ThemeProvider } from '../components/Theme';
import { SocialAppBar } from '../components/SocialAppBar';

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Head>
        <title>Christian de Botton</title>
        <meta
          name="description"
          content="Photography portfolio and occasional engineering focused writing by Brooklyn based software engineer, Christian de Botton."
        />
      </Head>
      <ThemeProvider>
        <Viewport>
          <AppStyle />
          <Component {...pageProps} />
          <SocialAppBar
            css={css`
              position: fixed;
              bottom: 0;
              right: 0;
            `}
          />
        </Viewport>
      </ThemeProvider>
    </Container>
  );
}

export default App;
