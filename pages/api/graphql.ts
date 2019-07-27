import { join } from 'path';

import { ApolloServer } from 'apollo-server-micro';
import Photon from '@generated/photon';
import { nexusPrismaPlugin } from '@generated/nexus-prisma';
import { makeSchema, queryType, objectType } from '@prisma/nexus';

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
    t.model.name();
  },
});

const Query = queryType({
  definition(t) {
    t.list.field('users', {
      type: User,
      resolve: (parent, args, { photon }) => {
        return photon.users.findMany();
      },
    });
  },
});

const dirname = join(process.cwd(), 'pages/api');

const schema = makeSchema({
  types: [Query, User, nexusPrisma],
  outputs: {
    typegen: join(dirname, '../generated/nexus-typegen.ts'),
    schema: join(dirname, '/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      { source: '@generated/photon', alias: 'photon' },
      { source: join(dirname, 'types.ts'), alias: 'ctx' },
    ],
    contextType: 'ctx.Context',
  },
});

const apolloServer = new ApolloServer({
  schema,
  context: { photon },
});

export const config = {
  api: { bodyParser: false },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
