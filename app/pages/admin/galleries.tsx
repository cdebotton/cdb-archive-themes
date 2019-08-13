import React from 'react';
import { DocumentContext } from 'next/document';

import { Text } from '../../components/Text';
import getViewer from '../../libs/getViewer';
import { redirect } from '../../libs/redirect';
import { AdminLayout } from '../../components/AdminLayout';
import * as ViewerTypes from '../../__generated__/Viewer';

type Props = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  pageProps: { viewer: ViewerTypes.Viewer_viewer };
};

export default function AdminGalleriesPage({ pageProps: { viewer } }: Props) {
  return (
    <AdminLayout viewer={viewer}>
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
