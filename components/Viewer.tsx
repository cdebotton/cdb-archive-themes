import React, {
  useReducer,
  ReactNode,
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';

import * as ApolloTypes from './__generated__/Viewer';

type State = ApolloTypes.Viewer & {
  jwt: string | null;
};

type Action =
  | {
      type: 'SET_JWT';
      payload: string | null;
    }
  | { type: 'SET_VIEWER'; payload: ApolloTypes.Viewer['viewer'] };

function readLocalToken(): string | null {
  if (process.browser) {
    return localStorage.getItem(process.env.TOKEN_KEY) || null;
  }

  return null;
}

type Props = {
  children?: ReactNode;
};

const Viewer = createContext<ApolloTypes.Viewer['viewer']>(null);
const ViewerDispatch = createContext<Dispatch<Action>>(() => {
  throw new Error('Not implemented');
});

const VIEWER_QUERY = gql`
  query Viewer($jwt: String!) {
    viewer(jwt: $jwt) {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
`;

export function ViewerProvider({ children }: Props) {
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'SET_JWT':
        return {
          ...state,
          jwt: action.payload,
        };
      case 'SET_VIEWER':
        return {
          ...state,
          viewer: action.payload,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, readLocalToken(), jwt => {
    return { jwt, viewer: null };
  });

  const client = useApolloClient();
  const stale = useRef(false);

  useEffect(() => {
    if (state.jwt) {
      localStorage.setItem(process.env.TOKEN_KEY, state.jwt);
    } else {
      localStorage.removeItem(process.env.TOKEN_KEY);
    }
  }, [state.jwt]);

  useEffect(() => {
    stale.current = false;

    async function getViewer(jwt: string) {
      const { data } = await client.query<
        ApolloTypes.Viewer,
        ApolloTypes.ViewerVariables
      >({
        query: VIEWER_QUERY,
        variables: { jwt },
      });

      return data;
    }

    if (state.jwt) {
      getViewer(state.jwt).then(({ viewer }) => {
        if (!stale.current) {
          dispatch({ type: 'SET_VIEWER', payload: viewer });
        }
      });
    } else {
      dispatch({ type: 'SET_VIEWER', payload: null });
    }

    return () => {
      stale.current = true;
    };
  }, [state.jwt, client]);

  return (
    <Viewer.Provider value={state.viewer}>
      <ViewerDispatch.Provider value={dispatch}>
        {children}
      </ViewerDispatch.Provider>
    </Viewer.Provider>
  );
}

export function useViewer() {
  return useContext(Viewer);
}

export function useSetSession() {
  const dispatch = useContext(ViewerDispatch);

  return useCallback(
    (payload: string | null) => dispatch({ type: 'SET_JWT', payload }),
    [dispatch],
  );
}
