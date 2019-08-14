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
        I'm a web application engineer at <Vimeo />
      </p>
    </Page>
  );
}
