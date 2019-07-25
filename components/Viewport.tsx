import React, { ReactNode, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { padding, rem } from 'polished';

type Props = {
  className?: string;
  children: ReactNode;
};

export const Viewport = styled(function Viewport({
  className,
  children,
}: Props) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function onResize() {
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', onResize);

    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return (
    <div className={className} style={{ height }}>
      {children}
    </div>
  );
})`
  width: 100vw;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  ${padding(rem(20))};

  ${({ theme }) => {
    switch (theme.mode) {
      case 'light':
        return css`
          color: #1f1f1f;
          background-color: #fff;
        `;
      case 'dark':
        return css`
          color: #fff;
          background-color: #1f1f1f;
        `;
    }
  }}
`;
