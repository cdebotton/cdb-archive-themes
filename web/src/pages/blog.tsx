import { Heading } from 'components/Heading';
import { Page } from 'components/Page';
import { AppLayout } from 'layouts/AppLayout';
import Head from 'next/head';
import React, { ReactNode } from 'react';

export default function BlogPage() {
  return (
    <Page>
      <Head>
        <title>Writing | Christian de Botton</title>
      </Head>
      <div>
        <Heading level={1} fontSize={5}>
          Writing
        </Heading>
      </div>
    </Page>
  );
}

BlogPage.getLayout = (page: ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};
