import { Link } from 'components/Link';
import { useToggleMode, useMode } from 'libs/mode';
import { mq, space, fontSizes, colors, fontWeights } from 'libs/theme';
import React, { ReactNode, useState, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export function AppLayout({ children }: Props) {
  return (
    <>
      <div>{children}</div>
      <ThemeToggle
        css={{ position: 'fixed', top: space[4].rem, right: space[4].rem }}
      />
    </>
  );
}

interface ThemeToggleProps {
  className?: string;
}

function ThemeToggle({ className }: ThemeToggleProps) {
  const toggle = useToggleMode();
  const mode = useMode();
  const [text, setText] = useState('Mode');

  useEffect(() => {
    setText(mode === 'dark' ? 'Light' : 'Dark');
  }, [mode]);

  return (
    <button
      className={className}
      css={mq({
        justifySelf: 'end',
        position: 'relative',
        borderRadius: ['50%', 5],
        border: 'none',
        overflow: 'hidden',
        display: ['block', 'inline-block'],
        textIndent: [-99999, 0],
        background: colors.vars.background800,
        color: colors.vars.text800,
        width: [space[4].rem, 'auto'],
        height: [space[4].rem, 'auto'],
        padding: [0, `${space[2].rem} ${space[3].rem}`],
        cursor: 'pointer',
        letterSpacing: -1,
        fontWeight: fontWeights.bold,
        textTransform: 'uppercase',
        '&:focus, &:active': {
          outline: 'none',
        },
      })}
      onClick={toggle}
    >
      {text}
    </button>
  );
}
