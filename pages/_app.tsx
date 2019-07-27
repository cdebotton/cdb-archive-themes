import React from 'react';
import { Container } from 'next/app';
import Head from 'next/head';
import { css } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';

import { AppStyle } from '../components/AppStyle';
import { Viewport } from '../components/Viewport';
import { ThemeProvider } from '../components/Theme';
import { SocialAppBar } from '../components/SocialAppBar';
import withApolloClient, { ApolloAppProps } from '../lib/with-apollo-client';

function App({ Component, pageProps, apolloClient }: ApolloAppProps) {
  return (
    <ApolloProvider client={apolloClient}>
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
    </ApolloProvider>
  );
}

export default withApolloClient(App);
