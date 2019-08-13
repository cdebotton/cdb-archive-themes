/// <reference types="react-scripts" />

import 'react-dom';

declare module 'react-dom' {
  import { ReactElement } from 'reat';

  type ReactRoot = {
    render(element: ReactElement): void;
  };

  export function unstable_createRoot(node: HTMLElement): ReactRoot;
}
