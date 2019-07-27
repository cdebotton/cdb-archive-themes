import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function create(initialState: NormalizedCacheObject) {
  const isBrowser = process.browser === true;

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
      credentials: 'same-origin',
      fetch: !isBrowser && fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}

export default function initApollo(initialState?: NormalizedCacheObject) {
  if (!process.browser) {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
