import { withData } from 'next-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import cookie from 'cookie';

export const withApollo = withData(ctx => {
  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_URL
      ? process.env.GRAPHQL_URL
      : `${ctx ? `http://${ctx.req.headers.host}` : ''}/graphql`,
    fetch: fetch,
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => {
    const token = ctx
      ? ctx.req.headers.cookie.token
      : cookie.parse(document.cookie).token;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return {
    link: authLink.concat(httpLink),
  };
});
