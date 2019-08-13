import React from 'react';
import { DocumentContext } from 'next/document';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

import { Text } from '../../../components/Text';
import getViewer from '../../../libs/getViewer';
import { redirect } from '../../../libs/redirect';
import { AdminLayout } from '../../../components/AdminLayout';
import * as ViewerTypes from '../../../__generated__/Viewer';
import * as ApolloTypes from '../../../__generated__/Users';

const QUERY = gql`
  query Users {
    users {
      id
      email
      firstName
      lastName
    }
  }
`;

type Props = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  pageProps: { viewer: ViewerTypes.Viewer_viewer };
};

export default function AdminUsersPage({ pageProps: { viewer } }: Props) {
  const { data, loading } = useQuery<ApolloTypes.Users>(QUERY, {
    variables: { id: viewer.id },
  });

  return (
    <AdminLayout viewer={viewer}>
      <Text>Users</Text>
      {!loading && (
        <ul>
          {data.users.map(user => (
            <li key={user.id}>
              <Link
                href={`/admin/users/[userId]?userId=${user.id}`}
                as={`/admin/users/${user.id}`}
              >
                <a>{user.email}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
}

AdminUsersPage.getInitialProps = async (context: DocumentContext) => {
  // @ts-ignore
  const { viewer } = await getViewer(context.apolloClient);

  if (!viewer) {
    redirect(context, '/admin/login');
  }

  return { viewer };
};
