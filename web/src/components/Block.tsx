import { isMutableRef } from 'libs/assert';
import { lerp } from 'libs/math';
import { api } from 'libs/pages';
import React, {
  ReactNode,
  createContext,
  useContext,
  useRef,
  forwardRef,
} from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Group } from 'three';

interface Props {
  children: ReactNode;
  offset?: number;
  factor: number;
}

const offsetContext = createContext(0);

export const Block = forwardRef<Group, Props>(
  ({ children, offset, factor, ...props }, outerRef) => {
    const { offset: parentOffset, sectionHeight } = useBlock();
    const ref = outerRef ?? useRef<Group>();

    offset = offset ?? parentOffset;

    useFrame(() => {
      if (!isMutableRef(ref) || !ref.current) {
        return;
      }

      const curY = ref.current.position.y;
      const curTop = api.getState().top;
      const zoom = api.getState().zoom;

      ref.current.position.y = lerp(curY, (curTop / zoom) * factor, 0.1);
    });

    return (
      <offsetContext.Provider value={offset}>
        <group {...props} position={[0, -sectionHeight * offset * factor, 0]}>
          <group ref={ref}>{children}</group>
        </group>
      </offsetContext.Provider>
    );
  },
);

function useBlock() {
  const { pages, zoom } = api.getState();
  const { viewport } = useThree();
  const offset = useContext(offsetContext);
  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  const canvasWidth = viewportWidth / zoom;
  const canvasHeight = viewportHeight / zoom;
  const margin = canvasWidth * 0.1;
  const contentMaxWidth = canvasWidth * 0.6;
  const sectionHeight = canvasHeight * (pages.length - 1);
  const offsetFactor = (offset + 1.0) / 1;

  return {
    viewport,
    offset,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    margin,
    contentMaxWidth,
    sectionHeight,
    offsetFactor,
  };
}
