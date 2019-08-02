import { join } from 'path';

import Photon from '@generated/photon';
import { nexusPrismaPlugin } from '@generated/nexus-prisma';
import {
  queryType,
  mutationType,
  objectType,
  makeSchema,
  stringArg,
} from '@prisma/nexus';
import { ApolloServer } from 'apollo-server-micro';
import { genSalt, hash } from 'bcrypt';

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
    t.model.profile();
  },
});

const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id();
    t.model.firstName();
    t.model.lastName();
    t.model.user();
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

const Mutation = mutationType({
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
        firstName: stringArg(),
        lastName: stringArg(),
      },
      async resolve(parent, args, { photon }) {
        const salt = await genSalt(10);
        const password = await hash(args.password, salt);

        return photon.users.create({
          data: {
            password,
            email: args.email,
            profile: {
              create: {
                firstName: args.firstName,
                lastName: args.lastName,
              },
            },
          },
        });
      },
    });
  },
});

const schema = makeSchema({
  types: [Query, Mutation, User, Profile, nexusPrisma],
  outputs: {
    schema: join(__dirname, './schema.graphql'),
    typegen: join(__dirname, './generated/nexus-typegen.ts'),
  },
  typegenAutoConfig: {
    sources: [
      { source: '@generated/photon', alias: 'photon' },
      { source: join(__dirname, './types.ts'), alias: 'ctx' },
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

export default server.createHandler({ path: '/graphql' });
