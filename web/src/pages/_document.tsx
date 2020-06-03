import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import React from 'react';

const INIT_THEME = `
  var KEY = 'cdb:mode';

  try {
    var m = localStorage.getItem(KEY);
    if (!m) {
      m = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    window.init = { mode: m };
  } catch (err) {
    console.warn(err);
  }
`.replace(/(?<!var)\s/g, '');

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <script
            type="application/javascript"
            dangerouslySetInnerHTML={{ __html: INIT_THEME }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
