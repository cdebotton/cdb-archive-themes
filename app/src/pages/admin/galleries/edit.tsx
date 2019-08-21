import React, { ChangeEvent } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components/macro';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik, FormikProps } from 'formik';
import { rem } from 'polished';

import { useRouter } from '../../../hooks/useRouter';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Loading } from '../../../components/Loading';
import { TextArea } from '../../../components/TextArea';
import { Container, Heading } from '../../../components/Heading';

import { Gallery, GalleryVariables } from './__generated__/Gallery';
import {
  UpdateGallery,
  UpdateGalleryVariables,
} from './__generated__/UpdateGallery';

type Params = {
  galleryId: string;
};

type Values = {
  title: string;
  uri: string;
  description: string;
  mediaIds: string[];
};

/**
 * ⚛️ Components
 */

const encodeUri = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^\w\d\s-]/g, '')
    .replace(/\s+/g, '-');

function Form({
  handleSubmit,
  handleReset,
  handleChange,
  setFieldValue,
}: FormikProps<Values>) {
  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const uri = encodeUri(event.target.value);
    setFieldValue('uri', uri);
    handleChange(event);
  }
  return (
    <FormLayout onSubmit={handleSubmit}>
      <Input
        css="grid-row: 1 / span 1; grid-column: 1 / span 1;"
        onChange={handleTitleChange}
        name="title"
        label="Title"
      />
      <Input
        css="grid-row: 1 / span 1; grid-column: 2 / span 1;"
        name="uri"
        label="URI"
      />
      <TextArea
        css="grid-row: 2 / span 1; grid-column: 1 / span 2;"
        name="description"
        label="Description"
      />
      <Button css="grid-row: 3 / span 1;" type="submit">
        Save
      </Button>
      <Button css="grid-row: 3 / span 1;" onClick={handleReset}>
        Cancel
      </Button>
    </FormLayout>
  );
}

Form.fragments = {
  galleryForm: gql`
    fragment GalleryForm on Gallery {
      id
      title
      description
      uri
      media {
        id
      }
    }
  `,
};

export const GALLERY_QUERY = gql`
  query Gallery($where: GalleryWhereArgs!) {
    gallery(where: $where) {
      ...GalleryForm
    }
  }
  ${Form.fragments.galleryForm}
`;

export const UPDATE_GALLERY_MUTATION = gql`
  mutation UpdateGallery($where: GalleryWhereArgs!, $data: UpdateGalleryArgs!) {
    updateGallery(where: $where, data: $data) {
      ...GalleryForm
    }
  }
  ${Form.fragments.galleryForm}
`;

export default function AdminEditGalleryPage() {
  const { match } = useRouter<Params>();
  const { data, error, loading } = useQuery<Gallery, GalleryVariables>(
    GALLERY_QUERY,
    {
      variables: { where: { id: match.params.galleryId } },
    },
  );
  const [updateGallery, updateGalleryResult] = useMutation<
    UpdateGallery,
    UpdateGalleryVariables
  >(UPDATE_GALLERY_MUTATION);

  function onSubmit(values: Values) {
    updateGallery({
      variables: { data: values, where: { id: match.params.galleryId } },
    });
  }

  if (error) {
    throw error;
  }

  if (!data || !data.gallery) {
    return <Loading />;
  }

  return (
    <Container>
      <Heading>Edit Gallery {data.gallery.title}</Heading>
      <Formik
        initialValues={{
          title: data.gallery.title,
          uri: data.gallery.uri,
          description: data.gallery.description,
          mediaIds: data.gallery.media.map(media => media.id),
        }}
        onSubmit={onSubmit}
        component={Form}
      />
    </Container>
  );
}

/**
 * 💅 Styles
 */

const FormLayout = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  grid-gap: ${rem(16)};
`;
