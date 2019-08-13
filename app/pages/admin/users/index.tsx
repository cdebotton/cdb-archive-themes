import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

import { Text } from '../../../components/Text';
import { AdminLayout } from '../../../components/AdminLayout';
import * as ApolloTypes from '../../../__generated__/Users';
import { withApollo } from '../../../libs/with-apollo';

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

function AdminUsersPage() {
  const { data, loading } = useQuery<ApolloTypes.Users>(QUERY);

  return (
    <AdminLayout>
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

export default withApollo(AdminUsersPage);
