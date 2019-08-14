import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import { useRouter } from '../../../hooks/useRouter';
import { Container, Heading } from '../../../components/Heading';
import { Loading } from '../../../components/Loading';

import * as ApolloTypes from './__generated__/AdminUsersQuery';

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

export default function AdminUsersIndex() {
  const { data, loading, error } = useQuery<ApolloTypes.AdminUsersQuery>(QUERY);
  const { match } = useRouter();

  return (
    <Container>
      <header>
        <Heading>List</Heading>
        <Link to={`${match.url}/new`}>New user</Link>
      </header>
      {loading && <Loading />}
      {error && <pre>{JSON.stringify(error)}</pre>}
      {data && data.users && (
        <ul>
          {data.users.map(user => {
            return (
              <li key={user.id}>
                <Link to={`${match.url}/${user.id}`}>
                  {user.firstName} {user.lastName} - {user.email}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
