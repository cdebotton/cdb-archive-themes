import React from 'react';
import styled from 'styled-components';

import { Text } from '../components/Text';
import Vimeo from '../components/Vimeo';
import { Section, Heading } from '../components/Heading';

export default function IndexPage() {
  return (
    <Layout>
      <Section>
        <Text scale={4}>Hello!</Text>
        <Heading scale={5}>My name's Christian.</Heading>
        <Text>
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
          's frontend platform team, previously on the distribution product
          team. I'm based in Brooklyn, NY and try to spend my free time taking
          pictures with my Fujifilm XT-2.
        </Text>
        <Text>
          I've rebuilt this site a million different ways, and ultimately I just
          wanted a place to show off some images that I'm particularly happy
          with, and occasioanlly write about programming, so here we are.
        </Text>
      </Section>
    </Layout>
  );
}

const Layout = styled.div`
  display: grid;
  grid-auto-flow: row dense;
`;
