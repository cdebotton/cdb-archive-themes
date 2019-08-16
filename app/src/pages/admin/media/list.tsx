import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components/macro';

import { Container, Heading } from '../../../components/Heading';
import { FileUpload } from '../../../components/FileUpload';
import { Loading } from '../../../components/Loading';

import { AllMedia } from './__generated__/AllMedia';

const QUERY = gql`
  query AllMedia {
    allMedia {
      id
      url
      createdAt
      updatedAt
    }
  }
`;

export default function AdminListMediaPage() {
  const { data, error, loading } = useQuery<AllMedia>(QUERY);

  if (error) {
    throw error;
  }

  if (!data || loading) {
    return <Loading />;
  }

  return (
    <Container>
      <header>
        <Heading>All media</Heading>
        <FileUpload />
      </header>
      <Grid>
        {data.allMedia.map(media => {
          return (
            <div>
              <img width="100%" alt={media.id} src={media.url} />
            </div>
          );
        })}
      </Grid>
    </Container>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: minmax(180px, auto);
  grid-auto-flow: dense;
`;
