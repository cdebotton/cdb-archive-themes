import React from 'react';
import { unstable_createRoot } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './pages/app';
import * as serviceWorker from './serviceWorker';
import { createClient } from './client';

const mount = document.getElementById('root');

if (!mount) {
  throw new Error('No HTMLElement #root found.');
}

const root = unstable_createRoot(mount);

const client = createClient();

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
