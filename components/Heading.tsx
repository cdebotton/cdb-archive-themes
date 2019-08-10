import React, { createContext, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { modularScale, em } from 'polished';

const LevelContext = createContext(0);

type SectionProps = {
  children: ReactNode;
};

export function Section({ children }: SectionProps) {
  const level = useContext(LevelContext);
  const nextLevel = Math.min(Math.max(level + 1, 1), 6);

  return (
    <LevelContext.Provider value={nextLevel}>{children}</LevelContext.Provider>
  );
}

type HeadingProps = {
  children: ReactNode;
  className?: string;
  scale: number;
};

export const Heading = styled(
  ({ children, scale: _, ...props }: HeadingProps) => {
    const level = useContext(LevelContext);
    return React.createElement(`h${level}`, props, children);
  },
)`
  font-size: ${props => modularScale(props.scale)};
  margin: ${props => em(props.scale)} 0;
`;
