import React from 'react';

import { Page } from '../components/Page';
import { Heading } from '../components/Heading';
import { LogoutButton } from '../components/LogoutButton';

export default function Admin() {
  return (
    <Page>
      <Heading scale={4}>Admin</Heading>
      <LogoutButton />
    </Page>
  );
}
