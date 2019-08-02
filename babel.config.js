module.exports = ({ env }) => {
  if (env('builder')) {
    return {
      presets: [
        [
          '@babel/env',
          {
            targets: { node: 'current' },
          },
        ],
        '@babel/typescript',
      ],
    };
  }

  return {
    presets: [['react-app', { typescript: true, flow: false }]],
    plugins: [
      [
        'styled-components',
        {
          pure: true,
          ssr: true,
          displayName: process.env.NODE_ENV !== 'production',
          minify: process.env.NODE_ENV === 'production',
        },
      ],
    ],
  };
};
