import React, { useRef } from 'react';
import Head from 'next/head';
import { AppContext, AppProps } from 'next/app';
import { getDataFromTree } from '@apollo/react-ssr';
import { NormalizedCacheObject, ApolloClient } from 'apollo-boost';

import initApollo from './init-apollo';

export type ApolloAppProps = AppProps & {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  apolloState: NormalizedCacheObject;
};

export default (App: any) => {
  function Apollo({ apolloState, ...props }: ApolloAppProps) {
    const apolloClient = useRef<ApolloClient<NormalizedCacheObject>>(
      initApollo(apolloState),
    );

    return <App {...props} apolloClient={apolloClient.current} />;
  }

  Apollo.displayName = 'withApollo(App)';

  Apollo.getInitialProps = async function getInitialProps(ctx: AppContext) {
    const { Component, router } = ctx;

    let appProps = {};

    if (App.getInitialProps) {
      appProps = await App.getInitialProps(ctx);
    }

    const apollo = initApollo();

    if (!process.browser) {
      try {
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apolloClient={apollo}
          />,
        );
      } catch (err) {
        console.error('Error while running `getDataFromTree`', err);
      }

      Head.rewind();
    }

    const apolloState = apollo.cache.extract();

    return {
      ...appProps,
      apolloState,
    };
  };

  return Apollo;
};
