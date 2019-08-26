import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from '@apollo/react-ssr';
import { getDisplayName, NextPageContext } from 'next-server/dist/lib/utils';
import { ApolloProvider } from '@apollo/react-hooks';
import { NextPage } from 'next';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import initApollo from './initApollo';

type PropsWithApollo<T> = T & {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  apolloState: NormalizedCacheObject;
};

export default function withApollo<Props>(PageComponent: NextPage<Props>) {
  return class extends React.Component<PropsWithApollo<Props>> {
    static displayName = `withApollo(${getDisplayName(PageComponent)})`;

    static async getInitialProps(ctx: NextPageContext) {
      const { AppTree } = ctx;

      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      const apolloClient = initApollo();
      if (typeof window === 'undefined') {
        try {
          await getDataFromTree(
            // @ts-ignore
            <AppTree pageProps={{ ...pageProps, apolloClient }} />,
          );
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error);
        }

        Head.rewind();
      }

      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: PropsWithApollo<Props>) {
      super(props);

      this.apolloClient = props.apolloClient || initApollo(props.apolloState);
    }

    render() {
      const { apolloClient: _0, apolloState: _1, ...pageProps } = this.props;

      return (
        <ApolloProvider client={this.apolloClient}>
          <PageComponent {...(pageProps as any)} />
        </ApolloProvider>
      );
    }
  };
}
