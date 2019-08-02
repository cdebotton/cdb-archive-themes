import React from 'react';
import NextApp, { Container, AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import { css } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { AppStyle } from '../components/AppStyle';
import { Viewport } from '../components/Viewport';
import { ThemeProvider } from '../components/Theme';
import { SocialAppBar } from '../components/SocialAppBar';
import withApollo from '../libs/with-apollo';

type Props = AppProps & { apolloClient: ApolloClient<NormalizedCacheObject> };

function App({ Component, pageProps, apolloClient }: Props) {
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

App.getInitialProps = async (context: AppContext) => {
  const props = await NextApp.getInitialProps(context);

  return props;
};

export default withApollo(App);
