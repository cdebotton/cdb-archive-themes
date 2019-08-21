import React from 'react';
import { MockedProvider } from '@apollo/react-testing';

import { FileUpload } from './FileUpload';

export default {
  title: 'components/FileUpload',
};

export const simple = () => (
  <MockedProvider mocks={[]} addTypename={false}>
    <FileUpload />
  </MockedProvider>
);
