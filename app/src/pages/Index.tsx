import React from 'react';

import { Heading } from '../components/Heading';
import { Page } from '../components/Page';

export default function IndexPage() {
  return (
    <Page>
      <p>Oh, hello!</p>
      <Heading scale={4}>My name's Christian</Heading>
    </Page>
  );
}
