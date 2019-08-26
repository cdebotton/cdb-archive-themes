import React from 'react';
import NextDocument, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components/macro';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const { renderPage: originalRenderPage } = ctx;
    const sheet = new ServerStyleSheet();

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
