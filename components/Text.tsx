import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { modularScale, margin } from 'polished';

type Props = {
  className?: string;
  children: ReactNode;
  scale?: number;
};

export const Text = styled(function Text({ className, children }: Props) {
  return <p className={className}>{children}</p>;
})`
  font-size: ${({ scale = 0 }) => modularScale(scale)};
  ${margin(0)};
`;
