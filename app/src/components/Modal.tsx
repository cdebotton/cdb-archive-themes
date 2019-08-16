import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components/macro';
import { position, size, rem, padding } from 'polished';

import { useOnClickOutside } from '../hooks/useOnClickOutside';

type Props = {
  className?: string;
  children: ReactNode;
  onClickOutside?: VoidFunction;
};

export function Modal({ className, children, onClickOutside }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClickOutside);

  return (
    <Root>
      <Container ref={ref} className={className}>
        {children}
      </Container>
    </Root>
  );
}

const Root = styled.div`
  ${position('fixed', 0, 0)}
  ${size('100vh', '100vw')};
  display: grid;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: #fff;
  box-shadow: 2px 2px 10px 5px hsla(0, 0%, 0%, 0.25);
  width: 90vw;
  max-width: ${rem(1160)};
  height: 90vh;
  border-radius: 3px;
  ${padding(rem(16))};
`;
