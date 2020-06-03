import { Global } from '@emotion/core';
import { useMode } from 'libs/mode';
import { colors, space, fonts, lineHeights, fontWeights } from 'libs/theme';
import { transparentize } from 'polished';
import React from 'react';

export function GlobalStyle() {
  const mode = useMode();

  return (
    <Global
      styles={{
        html: {
          fontSize: `calc(14px + 0.3vw)`,
        },
        body: {
          backgroundColor: colors.vars.background,
          color: colors.vars.text,
          margin: space[0].rem,
          fontFamily: fonts.body,
          lineHeight: lineHeights.body,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        code: {
          fontFamily: fonts.monospace,
        },
        a: {
          textDecoration: 'none',
          color: colors.vars.text,
          fontWeight: fontWeights.bold,
        },
        ':root ': {
          ...(mode && colors.root[mode]),
        },
        '::selection, ::-moz-selection': {
          backgroundColor: transparentize(0.2, 'magenta'),
        },
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        'html, body, #__next': {
          height: '100%',
          overflow: 'hidden',
        },
      }}
    />
  );
}
