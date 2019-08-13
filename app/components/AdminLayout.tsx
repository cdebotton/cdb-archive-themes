import React, { ReactNode, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import cookie from 'cookie';
import { useApolloClient } from '@apollo/react-hooks';
import { rem } from 'polished';

import { redirect } from '../libs/redirect';
import * as ViewerTypes from '../__generated__/Viewer';

import { Text } from './Text';
import { Button } from './Button';

type Props = {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/camelcase
  viewer: ViewerTypes.Viewer_viewer;
};

export function AdminLayout({ children, viewer }: Props) {
  const client = useApolloClient();

  const handleLogout = useCallback(async () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1,
      secure: process.env.NODE_ENV === 'production',
    });

    await client.resetStore();

    redirect({}, '/admin/login');
  }, [client]);

  let name: string;

  if (!viewer) {
    return <>Loading...</>;
  }

  const { email, firstName, lastName } = viewer;

  if (firstName || lastName) {
    name = [firstName, lastName].join(' ');
  } else {
    name = email;
  }

  return (
    <Page>
      <Header>
        <Text scale={1}>Hello, {name}!</Text>
        <Button css={{ justifySelf: 'end' }} onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Navigation>
        <Link href="/admin">
          <a>Dashboard</a>
        </Link>
        <Link href="/admin/galleries">
          <a>Galleries</a>
        </Link>
        <Link href="/admin/users">
          <a>Users</a>
        </Link>
      </Navigation>
      {children}
    </Page>
  );
}

// 💅 Styles

const Page = styled.div`
  width: 100%;
  min-height: 100%;
  display: grid;
  align-items: start;
  grid-template-rows: repeat(2, min-content) auto;
  grid-template-columns: auto;
  grid-gap: ${rem(16)};
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: max-content auto;
`;

const Navigation = styled.nav`
  display: grid;
  justify-content: start;
  grid-auto-flow: column;
  grid-gap: ${rem(16)};
`;
