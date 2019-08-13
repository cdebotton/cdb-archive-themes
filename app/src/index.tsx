import React from 'react';
import { unstable_createRoot } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './pages/App';
import * as serviceWorker from './serviceWorker';

const mount = document.getElementById('root');

if (!mount) {
  throw new Error('No HTMLElement #root found.');
}
const root = unstable_createRoot(mount);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
