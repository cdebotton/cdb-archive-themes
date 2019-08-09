import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
} from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import unfetch from 'isomorphic-unfetch';

let apolloClient: ApolloClient<NormalizedCacheObject>;

if (!process.browser) {
  // @ts-ignore
  global.fetch = unfetch;
}

const { NOW_URL = '' } = process.env;

type Options = {
  getToken(): string | null;
  fetchOptions?: { [x: string]: unknown };
};

function create(
  initialState: NormalizedCacheObject,
  { getToken, fetchOptions }: Options,
) {
  const httpLink = createHttpLink({
    uri: `${NOW_URL}/api/graphql`,
    fetch: fetch,
    fetchOptions,
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    ssrMode: !process.browser,
    connectToDevTools:
      process.browser && process.env.NODE_ENV === 'development',
    cache: new InMemoryCache().restore(initialState),
  });
}

export function initApollo(
  initialState: NormalizedCacheObject = {},
  options: Options,
) {
  if (!process.browser) {
    return create(initialState, options);
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
