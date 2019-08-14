import React from 'react';
import styled from 'styled-components/macro';

import { Heading } from '../components/Heading';
import { Page } from '../components/Page';
import { Vimeo } from '../components/Vimeo';
import { rem, modularScale } from 'polished';

export default function IndexPage() {
  return (
    <Page css="height: 100%; display: grid; grid-auto-flow: row; grid-template-rows: auto min-content;">
      <Content>
        <p>Oh, hello!</p>
        <Heading scale={4}>My name's Christian</Heading>
        <p>
          I'm a web application engineer at{' '}
          <a target="_BLANK" rel="noopener noreferrer" href="//vimeo.com">
            <Vimeo />
          </a>
          . I currently lead the front-end platform team there, but have
          previously lead product development for various teams within the
          organization.
        </p>
        <p>
          Prior to that, I worked at a small agency in Brooklyn as their
          Director of Engineering, developing marketing driven solutions for
          companies like Netflix, The Moth, and AT&amp;T.
        </p>
        <p>
          I'm based in Brooklyn, and when I have free time I enjoy wandering
          around and taking photos with my Fujifilm X-T2.
        </p>
      </Content>
      <Social>
        <SocialLink
          target="_BLANK"
          rel="noopener noreferrer"
          href="//github.com/cdebotton"
        >
          Github
        </SocialLink>
        <SocialLink
          target="_BLANK"
          rel="noopener noreferrer"
          href="//medium.com/@cdebotton"
        >
          Medium
        </SocialLink>
        <SocialLink
          target="_BLANK"
          rel="noopener noreferrer"
          href="//instagram.com/cdebotton"
        >
          Instagram
        </SocialLink>
        <SocialLink
          target="_BLANK"
          rel="noopener noreferrer"
          href="//instagram.com/cdebotton"
        >
          Twitter
        </SocialLink>
      </Social>
    </Page>
  );
}

const Content = styled.div``;

const Social = styled.footer`
  display: grid;
  grid-auto-flow: column dense;
  justify-content: start;
  grid-gap: ${rem(16)};
`;

const SocialLink = styled.a`
  text-decoration: none;
  color: #727272;
  font-weight: 800;
  text-transform: uppercase;
  font-size: ${modularScale(-1)};
`;
