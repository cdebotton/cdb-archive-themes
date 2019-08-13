import React, { lazy, Suspense, useReducer } from 'react';
import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import { AppStyle } from '../components/AppStyle';

const Admin = lazy(() => import('./Admin'));
const Index = lazy(() => import('./Index'));

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<>Loading...</>}>
        <AppStyle />
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Index} />
        </Switch>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

function useTheme() {
  type Mode = 'light' | 'dark';

  type State = {
    mode: Mode;
  };

  type Action = {
    type: 'CHANGE_MODE';
    payload: Mode;
  };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'CHANGE_MODE':
        return { ...state, mode: action.payload };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, { mode: 'light' });

  return state;
}
