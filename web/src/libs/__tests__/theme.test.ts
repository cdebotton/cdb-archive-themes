import { createTheme, toCssVar } from '../theme';

describe('createTheme', () => {
  it('can create cssVar strings', () => {
    const cssVar = toCssVar('fontSize100');

    expect(cssVar).toBe('--font-size-100');
  });

  it('creates css variables', () => {
    const colors = createTheme({
      pageBackground: { light: '#fff', dark: '#111' },
      text: { light: '#111', dark: '#fff' },
    });

    expect(colors.vars).toEqual({
      pageBackground: '--page-background',
      text: '--text',
    });
  });

  it('creates theme modes', () => {
    const colors = createTheme({
      pageBackground: { light: '#fff', dark: '#111' },
      text: { light: '#111', dark: '#fff' },
    });

    expect(colors.modes).toEqual({
      light: 'light',
      dark: 'dark',
    });
  });

  it('create root declarations', () => {
    const colors = createTheme({
      pageBackground: { light: '#fff', dark: '#111' },
      text: { light: '#111', dark: '#fff' },
    });

    expect(colors.root.light).toEqual({
      '--page-background': '#fff',
      '--text': '#111',
    });

    expect(colors.root.dark).toEqual({
      '--page-background': '#111',
      '--text': '#fff',
    });
  });

  it('create returns the original config', () => {
    const config = {
      pageBackground: { light: '#fff', dark: '#111' },
      text: { light: '#111', dark: '#fff' },
    };

    const colors = createTheme(config);

    expect(colors.values).toBe(config);
  });
});
