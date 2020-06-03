import { Controller } from '@react-spring/core';
import { config as configs } from 'react-spring';
import create, { StateCreator } from 'zustand';

interface State {
  controller: Controller<{ value: number }>;
  top: number;
  zoom: number;
  pages: Symbol[];
  actions: {
    setTop: (number: number) => void;
    addPage: (page: Symbol) => void;
    removePage: (page: Symbol) => void;
  };
}

function animateTop<T extends State>(config: StateCreator<T>): StateCreator<T> {
  return (set, get, api) => {
    return config(
      (args) => {
        set(args);
        const value = get().top;

        get().controller.stop().start({ value, config: configs.slow });
      },
      get,
      api,
    );
  };
}

const [useStore, api] = create<State>(
  animateTop((set) => {
    return {
      controller: new Controller({ value: 0 }),
      top: 0,
      zoom: 75,
      pages: [],
      actions: {
        setTop: (top: number) =>
          set((state) => {
            return {
              ...state,
              top,
            };
          }),
        addPage(page: Symbol) {
          set((state) => {
            return { ...state, pages: [...state.pages, page] };
          });
        },
        removePage(page: Symbol) {
          set((state) => {
            return { ...state, pages: state.pages.filter((p) => p !== page) };
          });
        },
      },
    };
  }),
);

export function usePages() {
  return useStore((state) => {
    return [
      state.pages,
      state.actions.addPage,
      state.actions.removePage,
    ] as const;
  });
}

export function useTop() {
  return useStore((state) => [state.top, state.actions.setTop] as const);
}

export function useZoom() {
  return useStore((state) => state.zoom);
}

export { api };
