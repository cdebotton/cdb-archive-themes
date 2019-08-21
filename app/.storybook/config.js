import React from 'react';
import { configure, addDecorator } from '@storybook/react';

import { AppStyle } from '../src/components/AppStyle';

addDecorator(story => {
  return (
    <React.Fragment>
      <AppStyle />
      {story()}
    </React.Fragment>
  );
});

global.fetch = () => Promise.resolve(true);

configure(require.context('../src', true, /\.story\.tsx$/), module);
