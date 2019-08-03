import React, { Component } from 'react';
import { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { getDataFromTree } from '@apollo/react-ssr';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { initApollo } from './init-apollo';

type Props = AppProps & { apolloState: NormalizedCacheObject };

export default function withApollo(App: any) {
  return class Apollo extends Component {
    static displayName = 'withApollo(App)';
    static async getInitialProps(ctx: AppContext) {
      const appProps = await App.getInitialProps(ctx);
      const { AppTree } = ctx;
      const apolloClient = initApollo();
      if (!process.browser) {
        try {
          await getDataFromTree(
            <AppTree {...appProps} apolloClient={apolloClient} />,
          );
        } catch (err) {
          console.error('Error running `getDataFromTree`', err);
        }
      }

      Head.rewind();

      const apolloState = apolloClient.cache.extract();

      return { ...appProps, apolloState };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: Props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
}
