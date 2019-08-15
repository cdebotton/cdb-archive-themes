import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { Container, Heading } from '../../../components/Heading';
import { Loading } from '../../../components/Loading';
import { useRouter } from '../../../hooks/useRouter';

import * as ApolloTypes from './__generated__/Galleries';

const QUERY = gql`
  query Galleries {
    galleries {
      id
      title
    }
  }
`;

export default function GalleriesListPage() {
  const { data, loading, error } = useQuery<ApolloTypes.Galleries>(QUERY);
  const { match } = useRouter();

  if (error) {
    throw error;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <header>
        <Heading>All galleries</Heading>
        <Link to={`${match.url}/new`}>New gallery</Link>
      </header>
      {data && (
        <ul>
          {data.galleries.map(gallery => {
            return (
              <li key={gallery.id}>
                <Link to={`${match.url}/${gallery.id}`}>{gallery.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
