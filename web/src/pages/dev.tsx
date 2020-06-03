import { Heading } from 'components/Heading';
import { Page } from 'components/Page';
import { AppLayout } from 'layouts/AppLayout';
import { space } from 'libs/theme';
import Head from 'next/head';
import React, { ReactNode } from 'react';

export default function DevPage() {
  return (
    <Page>
      <Head>
        <title>Engineering | Christian de Botton</title>
      </Head>
      <div
        css={{
          position: 'relative',
          marginTop: space[3].rem,
          textAlign: 'right',
        }}
      >
        <Heading level={1} fontSize={5}>
          Engineering
        </Heading>
      </div>
    </Page>
  );
}

DevPage.getLayout = (page: ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};
