import React from 'react';
import NextApp, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { AppStyle } from '../components/AppStyle';
import { Viewport } from '../components/Viewport';
import { ThemeProvider } from '../components/Theme';
import withApollo from '../libs/with-apollo';
import { ViewerProvider } from '../components/Viewer';

type Props = { apolloClient: ApolloClient<NormalizedCacheObject> };

class App extends NextApp<Props> {
  render() {
    const { apolloClient, Component, ...pageProps } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Container>
          <ViewerProvider>
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
              </Viewport>
            </ThemeProvider>
          </ViewerProvider>
        </Container>
      </ApolloProvider>
    );
  }
}

export default withApollo(App);
