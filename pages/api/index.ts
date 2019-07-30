import { join } from 'path';

import { ApolloServer } from 'apollo-server-micro';
import { makeSchema, queryType, objectType } from '@prisma/nexus';
import Photon from '@generated/photon';
import { nexusPrismaPlugin } from '@generated/nexus-prisma';

import { Context } from './types';

const photon = new Photon();

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon,
});

const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id();
    t.model.firstName();
    t.model.lastName();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.user();
  },
});

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.lastLogin();
    t.model.profile();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.findManyUser({ alias: 'users' });
  },
});

const dirname = join(process.cwd(), 'pages/api');

const schema = makeSchema({
  types: [Query, Profile, User, nexusPrisma],
  outputs: {
    schema: join(dirname, '/schema.graphql'),
    typegen: join(dirname, '/generated/nexus-typegen.ts'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@generated/photon',
        alias: 'Photon',
      },
      {
        source: join(dirname, '/types.ts'),
        alias: 'ctx',
      },
    ],
    contextType: 'ctx.Context',
  },
});

const server = new ApolloServer({
  schema,
  context() {
    return {
      photon,
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api' });
