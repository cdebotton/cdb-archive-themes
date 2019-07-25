import React from 'react';

import { Text } from '../components/Text';

export default function IndexPage() {
  return (
    <>
      <Text scale={4} as="h1">
        Hello world!{' '}
        <span aria-label="globe" role="img">
          🌍
        </span>
      </Text>
    </>
  );
}
