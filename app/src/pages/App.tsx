import React, { useReducer } from 'react';
import { AppStyle } from '../components/AppStyle';
import { ThemeProvider } from 'styled-components';

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <>
        <AppStyle />
        <h1>Hello, world</h1>
      </>
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
