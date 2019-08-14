import React, {
  createElement,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import styled from 'styled-components/macro';
import { modularScale, margin } from 'polished';

const LevelContext = createContext(0);

type Props = {
  children: ReactNode;
  scale?: number;
};

export function Heading({ children, ...props }: Props) {
  const level = useContext(LevelContext);
  return (
    <AutoHeading level={level} {...props}>
      {children}
    </AutoHeading>
  );
}

type AutoHeadingProps = {
  level: number;
};

const AutoHeading = styled(
  ({ level, scale: _, children, ...props }: Props & AutoHeadingProps) => {
    return createElement(`h${level}`, props, children);
  },
)`
  font-size: ${({ scale = 0, level }) =>
    modularScale(scale ? scale : 6 - level)};
  ${margin('0.25em', 0)};
`;

export function Container({ children }: { children: ReactNode }) {
  const level = useContext(LevelContext);
  const nextLevel = Math.min(Math.max(level + 1, 0), 6);

  return (
    <LevelContext.Provider value={nextLevel}>{children}</LevelContext.Provider>
  );
}
