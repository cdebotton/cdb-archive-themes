import React from 'react';
import { DocumentContext } from 'next/document';

import getViewer from '../../libs/getViewer';
import { redirect } from '../../libs/redirect';
import * as ViewerTypes from '../../__generated__/Viewer';
import { AdminLayout } from '../../components/AdminLayout';

type Props = {
  pageProps: ViewerTypes.Viewer;
};

export default function AdminPage({ pageProps: { viewer } }: Props) {
  return <AdminLayout viewer={viewer}>Hi!</AdminLayout>;
}

AdminPage.getInitialProps = async (context: DocumentContext) => {
  // @ts-ignore
  const { viewer } = await getViewer(context.apolloClient);

  if (!viewer) {
    redirect(context, '/admin/login');
  }

  return { viewer };
};
