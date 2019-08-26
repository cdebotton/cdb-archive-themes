import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import cookie from 'cookie';
import unfetch from 'isomorphic-unfetch';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function create(initialState: NormalizedCacheObject) {
  const isBrowser = process.browser;

  const httpLink = createUploadLink({
    uri:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/graphql'
        : '/graphql',
    credentials: 'same-origin',
    fetch: !isBrowser ? unfetch : fetch,
  });

  const authLink = setContext((_, { headers }) => {
    const { token } = cookie.parse(document.cookie);

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState),
  });
}

export default function initApollo(initialState: NormalizedCacheObject = {}) {
  if (typeof window === 'undefined') {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
