import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { size, rem } from 'polished';

type Props = {
  className?: string;
  scale?: number;
};

export function Loading({ className, scale = 32 }: Props) {
  return (
    <Spinner
      css={`
        font-size: ${rem(scale)};
        ${size(rem(scale))}
      `}
      className={className}
    />
  );
}

const spin = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  
  100% {
    transform: rotateZ(360deg);
  }
`;

const Spinner = styled.div`
  display: inline-block;
  border-radius: 50%;
  color: hsla(212, 50%, 50%, 0.5);
  box-shadow: inset 0 0 0 0.1em;
  position: relative;

  &,
  &::after {
    border-radius: 50%;
  }

  &::after {
    display: block;
    content: '';
    position: absolute;
    ${size('100%')};
    border-top: 0.1em solid hsla(212, 50%, 100%, 0.5);
    border-left: 0.1em solid transparent;
    border-right: 0.1em solid transparent;
    border-bottom: 0.1em solid transparent;
    animation: ${spin} 1s linear infinite;
  }
`;
