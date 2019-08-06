import React from 'react';
import { DocumentContext } from 'next/document';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Text } from '../../components/Text';
import getViewer from '../../libs/getViewer';
import { redirect } from '../../libs/redirect';
import { AdminLayout } from '../../components/AdminLayout';

const QUERY = gql`
  query AdminIndexQuery($id: String) {
    user(id: $id) {
      ...CurrentUser
    }
  }

  ${AdminLayout.fragments.viewer}
`;

type Props = {
  pageProps: { viewer: any };
};

export default function AdminGalleriesPage({ pageProps: { viewer } }: Props) {
  const { data, error, networkStatus, loading } = useQuery(QUERY, {
    variables: { id: viewer.id },
  });

  return (
    <AdminLayout viewer={data && data.user}>
      <Text>Galleries</Text>
    </AdminLayout>
  );
}

AdminGalleriesPage.getInitialProps = async (context: DocumentContext) => {
  // @ts-ignore
  const { viewer } = await getViewer(context.apolloClient);

  if (!viewer) {
    redirect(context, '/admin/login');
  }

  return { viewer };
};
