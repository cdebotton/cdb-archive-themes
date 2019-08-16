import { RefObject, useEffect } from 'react';

export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback?: VoidFunction,
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof HTMLElement) || !ref.current || !callback) {
        return;
      }

      if (!ref.current.contains(event.target)) {
        callback();
      }
    }

    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  });
}
