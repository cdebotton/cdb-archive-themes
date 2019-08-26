import { join } from 'path';
import Photon from '@generated/photon';
import { nexusPrismaPlugin } from '@generated/nexus-prisma';
import { ApolloServer } from 'apollo-server-micro';
import { queryType, makeSchema } from '@prisma/nexus';

import { Context } from './types';

const photon = new Photon();
const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon,
});

const Query = queryType({
  definition(t) {
    t.field('sayHello', {
      type: 'String',
      resolve() {
        return 'Hello!';
      },
    });
  },
});

const __dirname = join(process.cwd(), 'pages/api');

const schema = makeSchema({
  types: [Query, nexusPrisma],
  typegenAutoConfig: {
    sources: [
      { source: '@generated/photon', alias: 'photon' },
      { source: join(__dirname, './types.ts'), alias: 'ctx' },
    ],
    contextType: 'ctx.Context',
  },
  outputs: {
    typegen: join(__dirname, 'nexus-types.ts'),
    schema: join(__dirname, 'schema.graphql'),
  },
});

const server = new ApolloServer({
  schema,
  context() {
    return { photon };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api' });
