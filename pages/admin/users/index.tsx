import React from 'react';
import { DocumentContext } from 'next/document';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

import { Text } from '../../../components/Text';
import getViewer from '../../../libs/getViewer';
import { redirect } from '../../../libs/redirect';
import { AdminLayout } from '../../../components/AdminLayout';

const QUERY = gql`
  query AdminIndexQuery($id: String) {
    user(id: $id) {
      ...CurrentUser
    }

    users {
      id
      email
      firstName
      lastName
    }
  }

  ${AdminLayout.fragments.viewer}
`;

type Props = {
  pageProps: { viewer: any };
};

export default function AdminUsersPage({ pageProps: { viewer } }: Props) {
  const { data, error, networkStatus, loading } = useQuery(QUERY, {
    variables: { id: viewer.id },
  });

  console.log(data);

  return (
    <AdminLayout viewer={data && data.user}>
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
