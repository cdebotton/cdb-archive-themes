import React, {
  createElement,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import styled from 'styled-components';
import { modularScale, margin } from 'polished';

const LevelContext = createContext(0);

type Props = {
  children: ReactNode;
  scale?: number;
};

export const Heading = styled(({ children, ...props }: Props) => {
  const level = useContext(LevelContext);

  return createElement(`h${level}`, props, children);
})`
  font-size: ${({ scale = 0 }) => modularScale(scale)};
  ${margin('0.25em', 0)};
`;

export function Container({ children }: { children: ReactNode }) {
  const level = useContext(LevelContext);
  const nextLevel = Math.min(Math.max(level + 1, 0), 6);

  return (
    <LevelContext.Provider value={nextLevel}>{children}</LevelContext.Provider>
  );
}
