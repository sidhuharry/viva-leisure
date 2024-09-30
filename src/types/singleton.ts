import { Nullable } from './nullable';

export type Instantialbe<T> = {
  getInstance: () => T;
  // util function to reset
  reset: () => void;
};

interface ISingleton {
  <R>(Class: new () => R): Instantialbe<R>;
  <R>(
    Class: new (...args: unknown[]) => R,
    ...args: unknown[]
  ): Instantialbe<R>;
}

/**
 * A util function to help create a singleton method
 * @param Class
 * @param initialArgs
 * @returns
 */
export const singleton: ISingleton = <R>(
  Class: new (...args: unknown[]) => R,
  ...initialArgs: unknown[]
): Instantialbe<R> => {
  let instance: Nullable<R> = null;

  return {
    getInstance() {
      if (instance == null) {
        instance = new Class(...initialArgs);
      }
      return instance;
    },
    reset() {
      instance = null;
    },
  };
};
