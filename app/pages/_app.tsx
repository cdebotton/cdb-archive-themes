import React from 'react';
import NextApp, { AppProps } from 'next/app';
import Head from 'next/head';

import { AppStyle } from '../components/AppStyle';
import { Viewport } from '../components/Viewport';
import { ThemeProvider } from '../components/Theme';

export default class App extends NextApp {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
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
            <Component {...pageProps} router={router} />
          </Viewport>
        </ThemeProvider>
      </>
    );
  }
}
