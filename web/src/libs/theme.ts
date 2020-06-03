import facepaint from 'facepaint';
import { rem, em, lighten, darken } from 'polished';

export function toCssVar(str: string) {
  const cssCase = str.replace(/([a-z])([A-Z\d])/g, (_group, m1, m2, i, str) => {
    return m1 + '-' + m2.toLowerCase();
  });

  return `--${cssCase}`;
}

type Vars<T> = { [Key in keyof T]: string };
type Modes<T> = { [Key in keyof T[keyof T]]: string };
type Values<T> = { [Key in keyof T]: string | number };
type Root<T> = { [Key in keyof Modes<T>]: Values<T> };

type Theme<T> = {
  vars: Vars<T>;
  modes: Modes<T>;
  root: Root<T>;
  values: T;
};

export function createTheme<T>(config: T): Theme<T> {
  const varEntries = Object.keys(config).map((key) => [key, toCssVar(key)]);
  const rootVars = Object.fromEntries(varEntries);
  const vars = Object.fromEntries(
    varEntries.map(([k, v]) => [k, `var(${v})`] as const),
  ) as any;

  const modeEntries = Object.values(config)
    .filter((x): x is { [mode: string]: T } => {
      return typeof x === 'object' && !Array.isArray(x);
    })
    .flatMap((value) => Object.keys(value).map((key) => [key, key]));
  const modes = Object.fromEntries(modeEntries);

  const rootEntries = Object.keys(modes).map((mode) => {
    const valueEntries = Object.entries(config).map(([k, v]) => [
      rootVars[k],
      v[mode],
    ]);
    return [mode, Object.fromEntries(valueEntries)];
  });

  const root = Object.fromEntries(rootEntries);

  return {
    vars,
    modes,
    root,
    values: config,
  };
}
export const space = measure([0, 4, 8, 16, 32, 64, 128, 256, 512]);

export const fonts = {
  body:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  monospace:
    "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
};

export const colors = createTheme({
  background: { dark: '#1f1f1f', light: '#e8e8e8' },
  background100: {
    dark: lighten(0.9, '#1f1f1f'),
    light: darken(0.9, '#e8e8e8'),
  },
  background200: {
    dark: lighten(0.8, '#1f1f1f'),
    light: darken(0.8, '#e8e8e8'),
  },
  background300: {
    dark: lighten(0.7, '#1f1f1f'),
    light: darken(0.7, '#e8e8e8'),
  },
  background400: {
    dark: lighten(0.6, '#1f1f1f'),
    light: darken(0.6, '#e8e8e8'),
  },
  background500: {
    dark: lighten(0.5, '#1f1f1f'),
    light: darken(0.5, '#e8e8e8'),
  },
  background600: {
    dark: lighten(0.4, '#1f1f1f'),
    light: darken(0.4, '#e8e8e8'),
  },
  background800: {
    dark: lighten(0.2, '#1f1f1f'),
    light: darken(0.2, '#e8e8e8'),
  },
  background900: {
    dark: lighten(0.1, '#1f1f1f'),
    light: darken(0.1, '#e8e8e8'),
  },
  text: { dark: '#eee', light: '#1f1f1f' },
  white: { dark: '#fefefe', light: '#e0e0e0' },
  black: { dark: '#111', light: '#232323' },
  primary: { dark: 'hsl(32, 75%, 60%)', light: 'hsl(212, 50%, 50%)' },
});

export const fontSizes = measure([12, 14, 16, 20, 24, 32, 48, 64, 96]);

export const fontWeights = {
  light: 200,
  body: 400,
  heading: 600,
  bold: 800,
};

export const lineHeights = {
  body: 1.5,
  heading: 1.125,
};

export const breakpoints = measure([640, 800, 1280]);

export const mq = facepaint(
  breakpoints.map((bp) => `@media (min-width: ${bp.px})`),
);

function measure(arr: number[]) {
  return arr.map((n) => {
    return {
      em: em(n),
      rem: rem(n),
      px: `${n}px`,
    };
  });
}
