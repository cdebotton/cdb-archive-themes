import { NextComponentType, NextPageContext } from 'next';
import { ReactNode, FC, RefObject } from 'react';

export type SceneProps<P = {}> = FC<
  P & { domPortal: RefObject<HTMLDivElement> }
>;

export type LayoutComponent<P = {}> = NextComponentType<
  NextPageContext,
  any,
  P
> & {
  getLayout?: (page: ReactNode) => ReactNode;
  Scene?: FC<SceneProps<P>>;
};

export function defaultLayout(page: ReactNode) {
  return page;
}
