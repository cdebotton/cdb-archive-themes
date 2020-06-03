/// <reference types="next" />
/// <reference types="next/types/global" />

import { ReactThreeFiber } from 'react-three-fiber';
import { InstancedBufferAttribute, FogExp2 } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      instancedBufferAttribute: ReactThreeFiber.Node<
        InstancedBufferAttribute,
        typeof InstancedBufferAttribute
      >;
      fogExp2: ReactThreeFiber.Node<FogExp2, typeof FogExp2>;
    }
  }
}
