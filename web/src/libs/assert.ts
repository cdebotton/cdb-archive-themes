import { MutableRefObject } from 'react';

export function assertNonNull<T>(x?: T | null): asserts x is T {
  if (x === null || x === undefined) {
    throw new Error(`Expected undefined value`);
  }
}

export function isMutableRef<T>(
  maybeRef: unknown,
): maybeRef is MutableRefObject<T> {
  return (
    typeof maybeRef === 'object' &&
    Object.getOwnPropertyDescriptor(maybeRef, 'current') !== undefined
  );
}
