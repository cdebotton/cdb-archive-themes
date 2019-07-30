import React from 'react';
import styled from 'styled-components';
import { em } from 'polished';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

import { Text } from '../components/Text';
import Vimeo from '../components/Vimeo';

type Gallery = {
  uri: string;
  title: string;
};

type Props = {
  galleries: Gallery[];
};

export default function IndexPage({ galleries }: Props) {
  return (
    <Layout>
      <Text scale={4}>Hello!</Text>
      <Text scale={5} as="h1">
        My name's Christian.
      </Text>
      <Text scale={1}>
        I'm the lead engineer on{' '}
        <a
          aria-label="vimeo"
          tabIndex={0}
          href="//vimeo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Vimeo />
        </a>
        's frontend platform team, previously on the distribution product team.
        I'm based in Brooklyn, NY and try to spend my free time taking pictures
        with my Fujifilm XT-2.
      </Text>
      <Text scale={1}>
        I've rebuilt this site a million different ways, and ultimately I just
        wanted a place to show off some images that I'm particularly happy with,
        and occasioanlly write about programming, so here we are.
      </Text>
      {galleries.map(gallery => (
        <Link
          prefetch
          key={gallery.uri}
          href="/galleries/[gid]"
          as={`/galleries/${gallery.uri}`}
        >
          <a>{gallery.title}</a>
        </Link>
      ))}
    </Layout>
  );
}

IndexPage.getInitialProps = async ({ req }) => {
  const galleries = await fetch(
    `http://${req ? req.headers.host : window.location.host}/api/galleries`,
  ).then(res => res.json());

  return { galleries };
};

const Layout = styled.div`
  display: grid;
  grid-auto-flow: row dense;
  grid-gap: ${em(16)};
`;
