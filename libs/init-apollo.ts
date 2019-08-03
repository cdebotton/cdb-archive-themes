import {
  ApolloClient,
  NormalizedCacheObject,
  HttpLink,
  InMemoryCache,
} from 'apollo-boost';
import unfetch from 'isomorphic-unfetch';

let apolloClient: ApolloClient<NormalizedCacheObject>;

if (!process.browser) {
  // @ts-ignore
  global.fetch = unfetch;
}

function create(initialState: NormalizedCacheObject) {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.GRAPHQL_URL,
      fetch: fetch,
    }),
    ssrMode: !process.browser,
    connectToDevTools:
      process.browser && process.env.NODE_ENV === 'development',
    cache: new InMemoryCache().restore(initialState),
  });
}

export function initApollo(initialState: NormalizedCacheObject = {}) {
  if (!process.browser) {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
