import React from 'react';

import { Text } from './Text';
import { AppStyle } from './AppStyle';

export default { title: 'Text' };

export const h1 = () => (
  <AppStyle theme={{ mode: 'light' }}>
    <Text as="h1" scale={5}>
      Hello world!
    </Text>
  </AppStyle>
);
