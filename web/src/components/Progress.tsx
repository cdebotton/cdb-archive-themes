import { usePages } from 'libs/pages';
import { colors } from 'libs/theme';
import React, { useMemo } from 'react';

export function Progress() {
  const [pages] = usePages();
  const blocks = useMemo(() => {
    return new Array(pages.length)
      .fill(null)
      .map((_, i) => (
        <div
          css={{ backgroundColor: colors.vars.background }}
          key={`PAGE_HANDLE:${i}`}
        />
      ));
  }, [pages]);
  return (
    <div
      css={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: 8,
        zIndex: 2,
        backgroundColor: colors.vars.background900,
        cursor: 'pointer',
        gridTemplateRows: `repeat(${pages.length}, 1fr)`,
        '&:hover': {
          width: 16,
        },
      }}
    >
      {blocks}
    </div>
  );
}
