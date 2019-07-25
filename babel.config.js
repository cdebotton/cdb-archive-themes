module.exports = {
  presets: [['react-app', { typescript: true, flow: false }]],
  plugins: [
    [
      'styled-components',
      {
        ssr: true,
        pure: true,
        displayName: process.env.NODE_ENV !== 'production',
        minify: process.env.NODE_ENV === 'production',
      },
    ],
  ],
};
