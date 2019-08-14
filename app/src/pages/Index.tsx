import React from 'react';

import { Heading } from '../components/Heading';
import { Page } from '../components/Page';
import { Vimeo } from '../components/Vimeo';

export default function IndexPage() {
  return (
    <Page>
      <p>Oh, hello!</p>
      <Heading scale={4}>My name's Christian</Heading>
      <p>
        I'm a web application engineer at{' '}
        <a target="_BLANK" rel="noopener noreferrer" href="//vimeo.com">
          <Vimeo />
        </a>
        . I currently lead the front-end platform team there, but have
        previously lead product development for various teams within the
        organization. Prior to that, I worked at a small agency in Brooklyn as
        their Director of Engineering, developing marketing driven solutions for
        companies like Netflix, The Moth, and AT&amp;T. I'm based in Brooklyn,
        and when I have free time I enjoy wandering around and taking photos
        with my Fujifilm X-T2.
      </p>
    </Page>
  );
}
