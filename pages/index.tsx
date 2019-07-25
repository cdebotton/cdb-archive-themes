import React from 'react';

import { Text } from '../components/Text';
import { useTheme, useThemeDispatch } from '../components/Theme';

export default function IndexPage() {
  const theme = useTheme();
  const dispatch = useThemeDispatch();

  function handleThemeToggle() {
    dispatch({
      type: 'CHANGE_THEME',
      payload: theme.mode === 'light' ? 'dark' : 'light',
    });
  }

  return (
    <>
      <Text scale={4} as="h1">
        Hello world{' '}
        <span aria-label="globe" role="img">
          {theme.mode === 'light' ? '🌍' : '🌒'}
        </span>
        !
      </Text>
      <pre>{JSON.stringify(theme, null, 2)}</pre>
      <button onClick={handleThemeToggle}>Toggle</button>
    </>
  );
}
