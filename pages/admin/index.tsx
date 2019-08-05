import React, { useCallback } from 'react';
import { DocumentContext } from 'next/document';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import cookie from 'cookie';
import gql from 'graphql-tag';

import getViewer from '../../libs/getViewer';
import { redirect } from '../../libs/redirect';

type Props = {
  pageProps: { viewer: any };
};

const QUERY = gql`
  query AdminIndexQuery($id: String, $email: String) {
    user(id: $id, email: $email) {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
`;

export default function AdminPage({ pageProps: { viewer } }: Props) {
  const client = useApolloClient();

  const handleLogout = useCallback(async () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1,
      secure: process.env.NODE_ENV === 'production',
    });

    await client.resetStore();

    redirect({}, '/admin/login');
  }, [client]);

  const { data, error, loading, networkStatus } = useQuery(QUERY, {
    variables: { id: viewer.id },
  });

  console.log(data);

  return (
    <div
      css={{
        width: '100vw',
        minHeight: '100vh',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

AdminPage.getInitialProps = async (context: DocumentContext) => {
  // @ts-ignore
  const { viewer } = await getViewer(context.apolloClient);

  if (!viewer) {
    redirect(context, '/admin/login');
  }

  return { viewer };
};
