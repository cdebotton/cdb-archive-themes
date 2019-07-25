import React, {
  createContext,
  Dispatch,
  useContext,
  useReducer,
  ReactElement,
} from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export type Theme = {
  mode: 'light' | 'dark';
};

type Action = {
  type: 'CHANGE_THEME';
  payload: 'light' | 'dark';
};

const notImplemented = () => {
  throw new Error('Not yet implemented');
};

const ThemeDispatchContext = createContext<Dispatch<Action>>(notImplemented);

type Props = {
  children: ReactElement;
};

export function ThemeProvider({ children }: Props) {
  function reducer(state: Theme, action: Action): Theme {
    switch (action.type) {
      case 'CHANGE_THEME':
        return { ...state, mode: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, { mode: 'light' });

  return (
    <ThemeDispatchContext.Provider value={dispatch}>
      <StyledThemeProvider theme={state}>{children}</StyledThemeProvider>
    </ThemeDispatchContext.Provider>
  );
}

export function useThemeDispatch() {
  return useContext(ThemeDispatchContext);
}
