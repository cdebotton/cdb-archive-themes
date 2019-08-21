import { MockedProvider } from '@apollo/react-testing';
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory';
import React from 'react';
import { __RouterContext as RouterContext } from 'react-router';
import { createMemoryHistory, createLocation } from 'history';

import { Page } from '../../../components/Page';

import EditGallery, { GALLERY_QUERY, UPDATE_GALLERY_MUTATION } from './edit';

export default {
  title: 'pages/admin/gallery/edit',
};

const galleryRoute = {
  history: createMemoryHistory(),
  location: createLocation('/admin/galleries/edit/1'),
  match: {
    params: {
      galleryId: 1,
    },
    isExact: false,
    path: '',
    url: '',
  },
};

const mocks = [
  {
    request: {
      query: GALLERY_QUERY,
      variables: {
        where: { id: 1 },
      },
    },
    result: {
      data: {
        gallery: {
          id: 1,
          uri: 'hello',
          title: 'Hello',
          description: 'This is a test gallery',
          media: [
            {
              id: 1,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_GALLERY_MUTATION,
      variables: {
        where: { id: 1 },
        data: {
          id: 1,
          uri: 'hello-2',
          title: 'Hello 2',
          description: 'This is an updated test gallery',
          media: [
            {
              id: 1,
            },
          ],
        },
      },
    },
    result: {
      data: {
        gallery: {
          id: 1,
          uri: 'hello-2',
          title: 'Hello 2',
          description: 'This is an updated test gallery',
          media: [
            {
              id: 1,
            },
          ],
        },
      },
    },
  },
];

export const page = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <RouterContext.Provider value={galleryRoute}>
      <Page>
        <EditGallery />
      </Page>
    </RouterContext.Provider>
  </MockedProvider>
);
