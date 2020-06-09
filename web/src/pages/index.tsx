import { Heading } from 'components/Heading';
import { Page } from 'components/Page';
import { VimeoLogo } from 'components/VimeoLogo';
import { AppLayout } from 'layouts/AppLayout';
import { mq, fontSizes, space, colors } from 'libs/theme';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import { IndexScene } from 'scenes/IndexScene';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Christian de Botton</title>
      </Head>
      <Page
        css={mq({
          marginLeft: [space[4].rem, space[4].rem, space[5].rem],
          display: 'grid',
          alignContent: 'center',
          gridTemplateColumns: ['40ch', '50ch'],
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
            fontSize: [fontSizes[7].rem, fontSizes[8].rem],
          })}
        >
          My name's <span css={{ color: colors.vars.primary }}>Christian</span>
        </Heading>
      </Page>
      <Page css={{ display: 'grid', placeContent: 'center' }}>
        <p
          css={mq({
            maxWidth: [space[9].rem, space[8].rem],
            fontSize: [fontSizes[2].rem, fontSizes[3].rem],
          })}
        >
          I'm an engineer based in <em>San Francisco</em> by way of{' '}
          <em>Brooklyn</em>, and I work on the frontend platform team at{' '}
          <a href="https://vimeo.com" target="_BLANK" rel="noreferrer">
            <VimeoLogo />
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

IndexPage.Scene = IndexScene;
