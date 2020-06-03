import { space, colors } from 'libs/theme';
import React, { ReactNode, MouseEventHandler } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({ children, className, onClick }: Props) {
  return (
    <button
      className={className}
      css={{
        paddingLeft: space[3].rem,
        paddingRight: space[3].rem,
        paddingTop: space[2].rem,
        paddingBottom: space[2].rem,
        borderRadius: 3,
        backgroundColor: colors.vars.primary,
        color: colors.vars.white,
        border: 'none',
        zIndex: 10,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
