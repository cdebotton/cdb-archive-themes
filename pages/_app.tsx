import React from 'react';
import NextApp, { Container, AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import { css } from 'styled-components';

import { AppStyle } from '../components/AppStyle';
import { Viewport } from '../components/Viewport';
import { ThemeProvider } from '../components/Theme';
import { SocialAppBar } from '../components/SocialAppBar';

export default function App({ Component, pageProps }: AppProps) {
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

App.getInitialProps = async (context: AppContext) => {
  const props = await NextApp.getInitialProps(context);

  return props;
};
