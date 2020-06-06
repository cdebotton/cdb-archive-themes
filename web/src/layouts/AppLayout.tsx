import { Link } from 'components/Link';
import { useToggleMode, useMode } from 'libs/mode';
import { mq, space, fontSizes, colors, fontWeights } from 'libs/theme';
import React, { ReactNode, useState, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export function AppLayout({ children }: Props) {
  return (
    <div
      css={mq({
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: ['100vw', 'min-content auto'],
        justifyContent: 'start',
        alignItems: 'start',
      })}
    >
      <nav
        css={mq({
          position: 'sticky',
          writingMode: ['inherit', 'vertical-lr'],
          display: 'grid',
          top: 0,
          gridAutoFlow: 'column',
          placeContent: 'start',
          alignItems: 'center',
          fontSize: [fontSizes[1], fontSizes[2]],
          gridGap: [space[2].rem, space[4].rem],
          padding: `${space[5].rem} ${space[4].rem} ${space[4].rem}`,
        })}
      >
        <Link exact href="/">
          Home
        </Link>
        <Link href="/photo">Photography</Link>
        <Link href="/dev">Engineering</Link>
        <Link href="/blog">Writing</Link>
        <ThemeToggle />
      </nav>
      <div>{children}</div>
    </div>
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
      <span css={{ writingMode: ['inherit', 'vertical-lr'] }}>{text}</span>
    </button>
  );
}
