import { isMutableRef } from 'libs/assert';
import { usePages } from 'libs/pages';
import { space, mq } from 'libs/theme';
import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  createContext,
} from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const pageContext = createContext({ current: 0 });

function getTop(element: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = element;
  while (node) {
    if (node) {
      top += node.offsetTop;
    }

    node = node.parentElement;
  }

  return top;
}

export const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, outerRef) => {
    const [, add, remove] = usePages();
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = outerRef ?? innerRef;

    const top = useRef(0);

    useEffect(() => {
      function adjust() {
        if (!isMutableRef(ref)) {
          return;
        }

        if (ref.current) {
          top.current = getTop(ref.current);
        }
      }

      adjust();

      window.addEventListener('resize', adjust);

      return () => window.removeEventListener('resize', adjust);
    }, [ref]);

    useEffect(() => {
      const sym = Symbol();
      add(sym);

      return () => remove(sym);
    }, [add, remove]);

    return (
      <pageContext.Provider value={top}>
        <div
          ref={ref}
          css={mq({
            position: 'relative',
            width: '100%',
            height: '100vh',
            padding: [
              `${space[5].rem} ${space[3].rem}`,
              `${space[5].rem} ${space[4].rem}`,
            ],
          })}
          className={className}
        >
          {children}
        </div>
      </pageContext.Provider>
    );
  },
);
