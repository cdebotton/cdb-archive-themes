import React, { lazy, Suspense, useReducer } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { Switch, Route } from 'react-router-dom';

import { AppStyle } from '../components/AppStyle';
import { Container } from '../components/Heading';
import ProtectedRoute from '../components/ProtectedRoute';
import { Viewport } from '../components/Viewport';
import { Loading } from '../components/Loading';

const Login = lazy(() => import('./Login'));
const Index = lazy(() => import('./Index'));
const Admin = lazy(() => import('./Admin'));
const NotFound = lazy(() => import('./NotFound'));

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Viewport>
        <Container>
          <Suspense fallback={<Loading />}>
            <AppStyle />
            <Switch>
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/admin" component={Admin} />
              <Route exact path="/" component={Index} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Container>
      </Viewport>
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
