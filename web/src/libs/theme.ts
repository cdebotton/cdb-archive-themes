import facepaint from 'facepaint';
import { rem, em, lighten, darken } from 'polished';

export function toCssVar(str: string) {
  const cssCase = str.replace(/([a-z])([A-Z\d])/g, (_group, m1, m2) => {
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
export const space = measure([0, 4, 8, 16, 32, 64, 128, 256, 512, 1024]);

export const fonts = {
  body:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  monospace:
    "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
};

const black = [
  lighten(0.2, '#2f2f2f'),
  lighten(0.15, '#2f2f2f'),
  lighten(0.1, '#2f2f2f'),
  lighten(0.05, '#2f2f2f'),
  lighten(0, '#2f2f2f'),
  darken(0.05, '#2f2f2f'),
  darken(0.1, '#2f2f2f'),
  darken(0.15, '#2f2f2f'),
  darken(0.2, '#2f2f2f'),
];

const white = [
  darken(0.2, '#d0d0d0'),
  darken(0.15, '#d0d0d0'),
  darken(0.1, '#d0d0d0'),
  darken(0.05, '#d0d0d0'),
  darken(0, '#d0d0d0'),
  lighten(0.05, '#d0d0d0'),
  lighten(0.1, '#d0d0d0'),
  lighten(0.15, '#d0d0d0'),
  lighten(0.2, '#d0d0d0'),
];

export const colors = createTheme({
  background100: { dark: black[0], light: white[0] },
  background200: { dark: black[1], light: white[1] },
  background300: { dark: black[2], light: white[2] },
  background400: { dark: black[3], light: white[3] },
  background500: { dark: black[4], light: white[4] },
  background600: { dark: black[5], light: white[5] },
  background700: { dark: black[6], light: white[6] },
  background800: { dark: black[7], light: white[7] },
  background900: { dark: black[8], light: white[8] },
  text100: { dark: white[0], light: black[0] },
  text200: { dark: white[1], light: black[1] },
  text300: { dark: white[2], light: black[2] },
  text400: { dark: white[3], light: black[3] },
  text500: { dark: white[4], light: black[4] },
  text600: { dark: white[5], light: black[5] },
  text700: { dark: white[6], light: black[6] },
  text800: { dark: white[7], light: black[7] },
  text900: { dark: white[8], light: black[8] },
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
