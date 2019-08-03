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
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Context } from './types';

const { JWT_SECRET } = process.env;

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
    t.field('viewer', {
      type: 'User',
      args: {
        jwt: stringArg({ required: true }),
      },
      async resolve(parent, args, { photon }) {
        if (!JWT_SECRET) {
          throw new Error(`process.env.TOKEN_KEY hasn't been set.`);
        }

        const userId = await jwt.verify(args.jwt, JWT_SECRET);

        if (typeof userId !== 'string') {
          throw new Error('Invalid JWT');
        }

        return await photon.users.findOne({ where: { id: userId } });
      },
    });

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

    t.field('login', {
      type: 'String',
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      async resolve(parent, args, { photon }) {
        if (!JWT_SECRET) {
          throw new Error(`process.env.TOKEN_KEY hasn't been set.`);
        }

        const user = await photon.users.findOne({
          where: { email: args.email },
        });

        if (!user) {
          throw new Error('Bad credentials');
        }

        if (!(await compare(args.password, user.password))) {
          throw new Error('Bad credentials');
        }

        return jwt.sign(user.id, JWT_SECRET);
      },
    });
  },
});

const schema = makeSchema({
  types: [Query, Mutation, User, Profile, nexusPrisma],
  outputs: {
    schema: join(__dirname, './schema.graphql'),
    typegen: join(__dirname, '../../generated/nexus-typegen.ts'),
  },
  typegenAutoConfig: {
    sources: [
      { source: '@generated/photon', alias: 'photon' },
      { source: join(__dirname, './types.ts'), alias: 'ctx' },
    ],
    contextType: 'ctx.Context',
  },
  shouldGenerateArtifacts: process.env.BABEL_ENV === 'builder',
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

export default server.createHandler({ path: '/api/graphql' });
