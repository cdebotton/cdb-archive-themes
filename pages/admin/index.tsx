import React, { useCallback } from 'react';
import { DocumentContext } from 'next/document';
import { useApolloClient } from '@apollo/react-hooks';

import getViewer from '../../libs/getViewer';
import { redirect } from '../../libs/redirect';

type Props = {
  pageProps: { viewer: unknown };
};

export default function AdminPage({ pageProps: { viewer } }: Props) {
  const client = useApolloClient();

  const handleLogout = useCallback(async () => {
    localStorage.removeItem('token');

    await client.resetStore();

    redirect({}, '/admin/login');
  }, [client]);

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <pre>
        <code>{JSON.stringify(viewer, null, 2)}</code>
      </pre>
    </>
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
