const fetch = require('isomorphic-unfetch');
const { getIntrospectionQuery } = require('graphql');
const fs = require('fs');

async function run() {
  const res = await fetch(
    `http://localhost:4000?query=${getIntrospectionQuery()}`,
  );
  const json = await res.json();

  fs.writeFileSync(
    join(__dirname, './__generated__/schema.json'),
    JSON.stringify(json, null, 2),
  );
  try {
    const [output] = await generate({
      overwrite: true,
      schema: 'http://localhost:4000',
      generates: {
        './src/__generated__/graphql.ts': {
          plugins: ['typescript', 'typescript-resolvers'],
        },
      },
      silent: true,
      config: {
        scalars: {
          DateTime: 'string',
          JSON: '{ [key: string]: any }',
        },
        useIndexSignature: true,
      },
    });
    fs.writeFileSync(join(__dirname, output.filename), output.content);
  } catch (err) {
    console.error(err);
  }
}

run();
