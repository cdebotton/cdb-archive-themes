import React, { Component } from 'react';
import { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { getDataFromTree } from '@apollo/react-ssr';
import cookie, { CookieParseOptions } from 'cookie';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { initApollo } from './init-apollo';

type Props = AppProps & { apolloState: NormalizedCacheObject };

function parseCookies(req?, options: CookieParseOptions = {}) {
  return cookie.parse(
    req ? req.headers.cookie || {} : document.cookie,
    options,
  );
}

export default function withApollo(App: any) {
  return class WithApollo extends Component {
    static displayName = `withApollo(${App.displayName})`;
    static async getInitialProps(ctx: AppContext) {
      const {
        AppTree,
        ctx: { req, res },
      } = ctx;

      const apolloClient = initApollo(
        {},
        { getToken: () => parseCookies(req).token },
      );

      // @ts-ignore
      ctx.ctx.apolloClient = apolloClient;

      let appProps;

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        return {};
      }

      if (!process.browser) {
        try {
          await getDataFromTree(
            <AppTree {...appProps} apolloClient={apolloClient} />,
          );
        } catch (err) {
          console.error('Error running `getDataFromTree`', err);
        }

        Head.rewind();
      }

      const apolloState = apolloClient.cache.extract();

      return { ...appProps, apolloState };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: Props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => {
          return parseCookies().token;
        },
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
}
