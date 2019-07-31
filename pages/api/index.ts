import { join } from 'path';

import Photon from '@generated/photon';
import { nexusPrismaPlugin } from '@generated/nexus-prisma';
import { makeSchema, queryType, objectType } from '@prisma/nexus';
import { ApolloServer } from 'apollo-server-micro';

import { Context } from './types';

const photon = new Photon();
const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon,
});

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Query = queryType({
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve(parent, args, { photon }) {
        return photon.users.findMany();
      },
    });
  },
});

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-native-reassign
  __dirname = join(process.cwd(), 'pages/api');
}

const schema = makeSchema({
  types: [Query, User, nexusPrisma],
  outputs: {
    schema: join(__dirname, '/schema.graphql'),
    typegen: join(__dirname, '../generated/nexus-typegen.ts'),
  },
  typegenAutoConfig: {
    sources: [
      { source: '@generated/photon', alias: 'photon' },
      { source: join(__dirname, 'types.ts'), alias: 'ctx' },
    ],
    contextType: 'ctx.Context',
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
