import { addDecorator, configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
configure(
  require.context('..', true, /(components|pages)\/.+\.story\.tsx$/),
  module,
);
