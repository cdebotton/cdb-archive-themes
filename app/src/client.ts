import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import cookie from 'cookie';

export function createClient() {
  const { GRAPHQL_URL = 'http://localhost:4000' } = process.env;

  const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
    credentials: 'include',
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
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
}
