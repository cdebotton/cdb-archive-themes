import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import unfetch from 'isomorphic-unfetch';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function create(initialState: NormalizedCacheObject) {
  const isBrowser = process.browser;

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: createUploadLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'same-origin',
      fetch: !isBrowser ? unfetch : fetch,
    }),
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
