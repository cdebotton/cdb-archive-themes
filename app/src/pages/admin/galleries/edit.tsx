import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components/macro';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import { rem } from 'polished';

import { Container, Heading } from '../../../components/Heading';
import { useRouter } from '../../../hooks/useRouter';
import { Loading } from '../../../components/Loading';
import { Input } from '../../../components/Input';
import { TextArea } from '../../../components/TextArea';
import { Button } from '../../../components/Button';
import { MediaSelectionInput } from '../../../components/MediaSelectionInput';

import {
  UpdateGallery,
  UpdateGalleryVariables,
} from './__generated__/UpdateGallery';
import { Gallery, GalleryVariables } from './__generated__/Gallery';

type Params = {
  galleryId: string;
};

const QUERY = gql`
  query Gallery($id: ID!) {
    gallery(id: $id) {
      id
      title
      uri
      description
      createdAt
      updatedAt
    }

    allMedia {
      ...MediaDetails
    }
  }
  ${MediaSelectionInput.fragments.media}
`;

const UPDATE_GALLERY_MUTATION = gql`
  mutation UpdateGallery($data: UpdateGalleryArgs!, $where: GalleryWhereArgs!) {
    updateGallery(data: $data, where: $where) {
      id
      title
      description
      uri
      publishedAt
      createdAt
      updatedAt
    }
  }
`;

type Values = {
  title: string;
  uri: string;
  description: string;
  mediaIds: string[];
};

export default function AdminEditGalleryPage() {
  const { match, history } = useRouter<Params>();

  const { data, error, loading } = useQuery<Gallery, GalleryVariables>(QUERY, {
    variables: { id: match.params.galleryId },
  });

  const [updateGallery, updateGalleryResult] = useMutation<
    UpdateGallery,
    UpdateGalleryVariables
  >(UPDATE_GALLERY_MUTATION, {
    refetchQueries: ['Galleries'],
  });

  useEffect(() => {
    if (updateGalleryResult.called) {
      history.push('/admin/galleries');
    }
  }, [updateGalleryResult, history]);

  if (error) {
    throw error;
  }

  if (loading || !data) {
    return <Loading />;
  }

  function onSubmit(data: Values) {
    updateGallery({
      variables: { data, where: { id: match.params.galleryId } },
    });
  }

  return (
    <Container>
      <Heading>Edit {data.gallery.title}</Heading>
      <Formik<Values>
        initialValues={{
          title: data.gallery.title,
          description: data.gallery.description,
          uri: data.gallery.uri,
          mediaIds: [],
        }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleReset, values }) => {
          return (
            <>
              <Form onSubmit={handleSubmit}>
                <Input
                  css="grid-area: a"
                  type="text"
                  label="Title"
                  name="title"
                />
                <Input css="grid-area: b" type="text" label="URI" name="uri" />
                <TextArea
                  css="grid-area: c"
                  label="Description"
                  name="description"
                />
                <MediaSelectionInput name="mediaIds" allMedia={data.allMedia} />
                <Button css="grid-area: d" type="submit">
                  Save
                </Button>
                <Button css="grid-area: e" type="reset" onClick={handleReset}>
                  Reset
                </Button>
              </Form>
              <pre>
                <code>{JSON.stringify(values, null, 2)}</code>
              </pre>
            </>
          );
        }}
      </Formik>
    </Container>
  );
}

/**
 * 💅 Styles
 */

const Form = styled.form`
  max-width: 80ch;
  display: grid;
  grid:
    'a b b .' min-content
    'c c c .' min-content
    'm m m m' 1fr
    '. . d e' min-content / 2fr 1fr 1fr 1fr;
  grid-gap: ${rem(16)};
`;
