import { useRef, useEffect } from 'react';

export function usePortal() {
  const elementRef = useRef(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(elementRef.current);
    return () => void document.body.removeChild(elementRef.current);
  }, []);

  return elementRef.current;
}
