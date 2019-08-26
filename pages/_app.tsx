import React from 'react';
import NextApp from 'next/app';

import { AppStyle } from '../components/AppStyle';
import { Viewport } from '../components/Viewport';

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <AppStyle />
        <Viewport>
          <Component {...pageProps} />
        </Viewport>
      </>
    );
  }
}
