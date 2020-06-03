import { Heading } from 'components/Heading';
import { Page } from 'components/Page';
import { AppLayout } from 'layouts/AppLayout';
import { mq, fontSizes, space, colors } from 'libs/theme';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import { a } from 'react-spring';
import IndexScene from 'scenes/IndexScene';

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
          gridTemplateColumns: [
            `auto`,
            `minmax(${space[6].rem}, 60vw)`,
            `minmax(${space[6].rem}, 40vw)`,
          ],
          padding: [`0 ${space[6].rem}`, `0 ${space[6].rem}`],
        })}
      >
        <Intro />
      </Page>
      <Page css={{ display: 'grid', placeContent: 'center' }}>
        <About />
      </Page>
    </>
  );
}

const AHeading = a(Heading);

function Intro() {
  return (
    <>
      <a.span
        css={mq({
          fontSize: [fontSizes[5].rem, fontSizes[6].rem],
          marginBottom: space[3].rem,
        })}
      >
        Oh, hello!
      </a.span>
      <AHeading
        level={1}
        css={mq({
          fontSize: [fontSizes[6].rem, fontSizes[7].rem],
        })}
      >
        My name's <span css={{ color: colors.vars.primary }}>Christian</span>
      </AHeading>
    </>
  );
}

function About() {
  return (
    <a.div css={{ width: space[8].rem, fontSize: fontSizes[4].rem }}>
      <p>
        I'm an engineer based in <em>San Francisco</em> by way of{' '}
        <em>Brooklyn</em>, and I work on the frontend platform team at{' '}
        <a css={{ color: '#1ab7ea' }} href="https://vimeo.com">
          vimeo
        </a>
        .
      </p>
    </a.div>
  );
}

IndexPage.getLayout = (page: ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

IndexPage.Scene = IndexScene;
