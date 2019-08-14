import { useQuery, useMutation } from '@apollo/react-hooks';
import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import { useRouter } from '../../../hooks/useRouter';
import { Container, Heading } from '../../../components/Heading';
import { Loading } from '../../../components/Loading';
import { Button } from '../../../components/Button';

import * as ApolloTypes from './__generated__/AdminUsersQuery';
import * as MutationTypes from './__generated__/DeleteUser';

const QUERY = gql`
  query AdminUsersQuery {
    viewer {
      id
    }

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

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export default function AdminUsersIndex() {
  const { data, loading, error } = useQuery<ApolloTypes.AdminUsersQuery>(QUERY);
  const [deleteUser, deleteUserResult] = useMutation<
    MutationTypes.DeleteUser,
    MutationTypes.DeleteUserVariables
  >(DELETE_USER_MUTATION, {
    update(store, { data }) {
      const cache = store.readQuery<ApolloTypes.AdminUsersQuery>({
        query: QUERY,
      });

      if (!cache) {
        return;
      }

      store.writeQuery({
        query: QUERY,
        data: {
          ...cache,
          users: cache.users.filter(user => user.id !== data.deleteUser.id),
        },
      });
    },
  });

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
                <Button
                  onClick={() => deleteUser({ variables: { id: user.id } })}
                >
                  Delete
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
