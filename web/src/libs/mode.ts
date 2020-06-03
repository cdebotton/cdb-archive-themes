import create, { StateCreator } from 'zustand';

const isServer = typeof window === 'undefined';

export type Mode = 'light' | 'dark';

interface State {
  mode: Mode;
  setMode(mode: Mode): void;
  toggleMode: VoidFunction;
}

const STORAGE_KEY = 'cdb:mode';

const invert = (mode: Mode) => (mode === 'light' ? 'dark' : 'light');

function persist<T extends State>(config: StateCreator<T>): StateCreator<T> {
  return (set, get, api) => {
    return config(
      (args) => {
        set(args);
        localStorage.setItem(STORAGE_KEY, get().mode);
      },
      get,
      api,
    );
  };
}

export const [useStore] = create<State>(
  persist((set, get) => {
    let initialMode;

    if (!isServer) {
      initialMode = window.init.mode;
    }

    return {
      mode: initialMode as any,
      setMode: (mode: Mode) => void set((state) => ({ ...state, mode })),
      toggleMode: () => {
        const inverse = invert(get().mode);
        set((state) => {
          return { ...state, mode: inverse };
        });
      },
    };
  }),
);

export function useMode() {
  return useStore((state) => state.mode);
}

export function useToggleMode() {
  return useStore((state) => state.toggleMode);
}

export function useSetMode() {
  return useStore((state) => state.setMode);
}
