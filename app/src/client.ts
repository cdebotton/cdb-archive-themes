import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import cookie from 'cookie';

export function createClient() {
  const httpLink = createHttpLink({
    uri:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : '/graphql',
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
