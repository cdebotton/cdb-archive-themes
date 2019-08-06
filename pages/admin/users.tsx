import React from 'react';
import { DocumentContext } from 'next/document';

import { Text } from '../../components/Text';
import getViewer from '../../libs/getViewer';
import { redirect } from '../../libs/redirect';
import { AdminLayout } from '../../components/AdminLayout';

type Props = {
  pageProps: { viewer: any };
};

export default function AdminUsersPage({ pageProps: { viewer } }: Props) {
  return (
    <AdminLayout viewer={viewer}>
      <Text>Users</Text>
    </AdminLayout>
  );
}

AdminUsersPage.getInitialProps = async (context: DocumentContext) => {
  // @ts-ignore
  const { viewer } = await getViewer(context.apolloClient);

  if (!viewer) {
    redirect(context, '/admin/login');
  }

  return { viewer };
};
