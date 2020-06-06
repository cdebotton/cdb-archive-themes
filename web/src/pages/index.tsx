import { Heading } from 'components/Heading';
import { Page } from 'components/Page';
import { AppLayout } from 'layouts/AppLayout';
import { mq, fontSizes, space, colors } from 'libs/theme';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { ReactNode } from 'react';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Christian de Botton</title>
      </Head>
      <Page
        css={mq({
          display: 'grid',
          alignContent: 'center',
          justifyContent: ['start', 'center'],
        })}
      >
        <span
          css={mq({
            fontSize: [fontSizes[5].rem, fontSizes[6].rem],
            marginBottom: space[3].rem,
          })}
        >
          Oh, hello!
        </span>
        <Heading
          level={1}
          css={mq({
            fontSize: [fontSizes[6].rem, fontSizes[7].rem],
          })}
        >
          My name's <span css={{ color: colors.vars.primary }}>Christian</span>
        </Heading>
      </Page>
      <Page css={{ display: 'grid', placeContent: 'center' }}>
        <p
          css={mq({
            maxWidth: [space[9].rem],
            fontSize: [fontSizes[4].rem, fontSizes[6].rem],
          })}
        >
          I'm an engineer based in <em>San Francisco</em> by way of{' '}
          <em>Brooklyn</em>, and I work on the frontend platform team at{' '}
          <a css={{ color: '#1ab7ea' }} href="https://vimeo.com">
            vimeo
          </a>
          .
        </p>
      </Page>
    </>
  );
}

IndexPage.getLayout = (page: ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

const IndexScene = dynamic(() => import('scenes/IndexScene'), { ssr: false });

IndexPage.Scene = IndexScene;
