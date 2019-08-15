import React, { ChangeEvent, useEffect } from 'react';
import { Formik } from 'formik';
import { rem } from 'polished';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import 'styled-components/macro';

import { Container, Heading } from '../../../components/Heading';
import { Input } from '../../../components/Input';
import { TextArea } from '../../../components/TextArea';
import { Button } from '../../../components/Button';
import { useRouter } from '../../../hooks/useRouter';

import * as ApolloTypes from './__generated__/CreateGallery';

type Values = {
  title: string;
  description: string;
  uri: string;
};

const MUTATION = gql`
  mutation CreateGallery($data: CreateGalleryArgs!) {
    createGallery(data: $data) {
      id
      uri
      title
      description
      createdAt
      updatedAt
    }
  }
`;

export default function AdminUserNewPage() {
  const { history } = useRouter();

  const [createGallery, createGalleryResult] = useMutation<
    ApolloTypes.CreateGallery,
    ApolloTypes.CreateGalleryVariables
  >(MUTATION, {
    refetchQueries: ['Galleries'],
  });

  function onSubmit(data: Values) {
    createGallery({ variables: { data } });
  }

  useEffect(() => {
    if (createGalleryResult.called) {
      history.push('/admin/galleries');
    }
  }, [createGalleryResult, history]);

  return (
    <Container>
      <Heading>New gallery</Heading>
      <Formik<Values>
        initialValues={{ title: '', description: '', uri: '' }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleReset, setFieldValue }) => {
          function updateUri(event: ChangeEvent<HTMLInputElement>) {
            const title = event.currentTarget.value;
            const uri = title
              .toLowerCase()
              .replace(/[\s]+/g, '-')
              .replace(/[^\w\d-]/g, '');

            setFieldValue('uri', uri);
          }

          return (
            <form
              css={{
                display: 'grid',
                grid: `'a b .' min-content 'c c .' min-content '. d e' min-content / 1fr 1fr 1fr`,
                gridGap: rem(16),
              }}
              onSubmit={handleSubmit}
            >
              <Input
                css="grid-area: a"
                label="Title"
                type="text"
                name="title"
                onChange={updateUri}
              />
              <Input css="grid-area: b" label="URI" name="uri" />
              <TextArea
                css="grid-area: c"
                label="Description"
                name="description"
              />
              <Button css="grid-area: d" type="submit">
                Save
              </Button>
              <Button css="grid-area: e" type="reset" onClick={handleReset}>
                Cancel
              </Button>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
}
