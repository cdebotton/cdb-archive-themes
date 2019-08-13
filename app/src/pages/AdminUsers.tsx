import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { Heading, Container } from '../components/Heading';
import * as ApolloTypes from './__generated__/AdminUsersQuery';
import { useRouter } from '../hooks/useRouter';

const QUERY = gql`
  query AdminUsersQuery {
    users {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
      lastLogin
    }
  }
`;

export default function AdminUsers() {
  const { data, loading, error } = useQuery<ApolloTypes.AdminUsersQuery>(QUERY);
  const { match } = useRouter();

  return (
    <Container>
      <Heading scale={3}>AdminUsers</Heading>
      {loading && <>Loading...</>}
      {error && <pre>{JSON.stringify(error)}</pre>}
      {data && data.users && (
        <ul>
          {data.users.map(user => {
            return (
              <li key={user.id}>
                <Link to={`${match.url}/${user.id}`}>{user.email}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
