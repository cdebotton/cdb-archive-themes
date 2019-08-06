import React, { ReactNode, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import gql from 'graphql-tag';
import cookie from 'cookie';
import { NetworkStatus } from 'apollo-boost';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { rem } from 'polished';

import { redirect } from '../libs/redirect';
import * as ApolloTypes from '../__generated__/AdminIndexQuery';
import * as ViewerTypes from '../__generated__/Viewer';

import { Text } from './Text';
import { Button } from './Button';

type Props = {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/camelcase
  viewer: ViewerTypes.Viewer_viewer;
};

const QUERY = gql`
  query AdminIndexQuery($id: String, $email: String) {
    user(id: $id, email: $email) {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
`;

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

  const { data, error, loading, networkStatus } = useQuery<
    ApolloTypes.AdminIndexQuery,
    ApolloTypes.AdminIndexQueryVariables
  >(QUERY, {
    variables: { id: viewer.id },
  });

  if (error) {
    throw new Error(error.toString());
  }

  if (loading && networkStatus !== NetworkStatus.refetch) {
    return <>Loading...</>;
  }

  let name: string;

  const {
    email,
    profile: { firstName, lastName },
  } = data.user;

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
  align-items: center;
  grid-template-rows: repeat(2, min-content) auto;
  grid-template-columns: auto;
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
