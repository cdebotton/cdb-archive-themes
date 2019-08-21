import React from 'react';
import { action } from '@storybook/addon-actions';

import { Button } from './Button';

export default {
  title: 'components/Button',
};

export const emoji = () => (
  <Button onClick={action('click')}>
    <span aria-label="pretty rocket" role="img">
      💅🚀
    </span>
  </Button>
);

export const text = () => <Button onClick={action('click')}>Hello!</Button>;
