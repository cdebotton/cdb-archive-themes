import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { Container, Heading } from '../../../components/Heading';
import { Loading } from '../../../components/Loading';
import { useRouter } from '../../../hooks/useRouter';
import { Button } from '../../../components/Button';

import * as ApolloTypes from './__generated__/Galleries';
import * as MutationTypes from './__generated__/DeleteGallery';

const QUERY = gql`
  query Galleries {
    galleries {
      id
      title
    }
  }
`;

const DELETE_GALLERY_MUTATION = gql`
  mutation DeleteGallery($id: ID!) {
    deleteGallery(id: $id) {
      id
    }
  }
`;

export default function GalleriesListPage() {
  const { data, loading, error } = useQuery<ApolloTypes.Galleries>(QUERY);
  const [deleteGallery] = useMutation<
    MutationTypes.DeleteGallery,
    MutationTypes.DeleteGalleryVariables
  >(DELETE_GALLERY_MUTATION, {
    update(store, { data: { deleteGallery } }) {
      const cache = store.readQuery<ApolloTypes.Galleries>({ query: QUERY });

      if (!cache) {
        return;
      }

      store.writeQuery({
        query: QUERY,
        data: {
          ...cache,
          galleries: cache.galleries.filter(
            gallery => gallery.id !== deleteGallery.id,
          ),
        },
      });
    },
  });
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
                <Link to={`${match.url}/${gallery.id}`}>{gallery.title}</Link>{' '}
                <Button
                  onClick={() =>
                    deleteGallery({ variables: { id: gallery.id } })
                  }
                  type="button"
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
