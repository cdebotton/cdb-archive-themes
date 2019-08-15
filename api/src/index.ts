import Photon from '@generated/photon';
import { ApolloServer, gql } from 'apollo-server';
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import fetch from 'isomorphic-unfetch';
import { getIntrospectionQuery } from 'graphql';
import fs from 'fs';

import { Context } from './types';
import { join } from 'path';

const { JWT_SECRET = 'SECRET' } = process.env;

const photon = new Photon();

const typeDefs = gql`
  scalar DateTime

  enum Role {
    ADMIN
    USER
  }

  type User {
    id: ID!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    firstName: String
    lastName: String
    lastLogin: DateTime
  }

  type Gallery {
    id: ID!
    uri: String!
    title: String!
    description: String!
    author: User
    deleted: Boolean
    publishedAt: DateTime
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    viewer: User!
    user(id: String, email: String): User!
    users: [User!]!
  }

  type Mutation {
    createUser(data: CreateUserArgs!): User!
    updateUser(data: UpdateUserArgs!): User!
    deleteUser(id: ID!): User!
    createGallery(data: CreateGalleryArgs!): Gallery!
    login(data: LoginArgs!): String!
  }

  input CreateUserArgs {
    email: String!
    password: String!
    repeatPassword: String!
    firstName: String
    lastName: String
  }

  input UpdateUserArgs {
    id: ID!
    email: String!
    password: String
    repeatPassword: String
    firstName: String
    lastName: String
  }

  input LoginArgs {
    email: String!
    password: String!
  }

  input CreateGalleryArgs {
    uri: String!
    title: String!
    description: String!
    authorId: ID!
    publishedAt: DateTime
  }
`;

const resolvers = {
  Query: {
    async viewer(parent: unknown, args: any, { photon, token }: Context) {
      if (!token) {
        throw new Error('No token');
      }

      const userId = await jwt.verify(token, JWT_SECRET);

      if (typeof userId !== 'string') {
        throw new Error('Invalid JWT');
      }

      return await photon.users.findOne({ where: { id: userId } });
    },

    user(
      parent: unknown,
      args: { id?: string; email?: string },
      { photon }: Context,
    ) {
      if (!(args.id || args.email)) {
        throw new Error('You must specify an id or email to find a user.');
      }

      return photon.users.findOne({ where: { id: args.id } });
    },

    users(parent: unknown, args: any, { photon }: Context) {
      return photon.users.findMany();
    },
  },
  Mutation: {
    async createUser(
      parent: unknown,
      args: {
        data: {
          email: string;
          password: string;
          firstName?: string;
          lastName?: string;
        };
      },
      { photon }: Context,
    ) {
      const salt = await genSalt(10);
      const password = await hash(args.data.password, salt);

      return photon.users.create({
        data: {
          password,
          email: args.data.email,
          firstName: args.data.firstName,
          lastName: args.data.lastName,
        },
      });
    },
    async updateUser(
      parent: unknown,
      args: {
        data: {
          id: string;
          email: string;
          password?: string;
          repeatPassword?: string;
          firstName?: string;
          lastName?: string;
        };
      },
      { photon }: Context,
    ) {
      const data: Record<string, string | undefined> = {
        email: args.data.email,
        firstName: args.data.firstName,
        lastName: args.data.lastName,
      };

      if (
        args.data.password &&
        args.data.password.trim() !== '' &&
        args.data.password === args.data.repeatPassword
      ) {
        const salt = await genSalt(10);
        data.password = await hash(args.data.password, salt);
      }

      return await photon.users.update({
        where: { id: args.data.id },
        data,
      });
    },
    async deleteUser(
      parent: unknown,
      args: { id: string },
      { photon, token }: Context,
    ) {
      if (!token) {
        throw new Error('No token');
      }

      const userId = await jwt.verify(token, JWT_SECRET);

      if (userId && userId === args.id) {
        throw new Error(`You can't delete yourself`);
      }

      return await photon.users.delete({ where: { id: args.id } });
    },
    async login(
      parent: unknown,
      args: { data: { email: string; password: string } },
      { photon }: Context,
    ) {
      const user = await photon.users.findOne({
        where: { email: args.data.email },
      });

      if (!user) {
        throw new Error('Bad credentials');
      }

      if (!(await compare(args.data.password, user.password))) {
        throw new Error('Bad credentials');
      }

      return jwt.sign(user.id, JWT_SECRET);
    },
    async createGallery(
      parent: unknown,
      args: { data: {} },
      { photon }: Context,
    ) {
      console.log(photon);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  ...(process.env.NODE_ENV === 'development' && {
    cors: {
      credentials: true,
      origin: true,
    },
  }),
  context({ req }) {
    const [, token] = req.headers.authorization
      ? req.headers.authorization.split(' ')
      : '';

    return { photon, token };
  },
});

if (process.env.NODE_ENV === 'development') {
  server.listen(4000, async () => {
    console.log(`🚀 Apollo Server is running at http://localhost:4000`);
    const res = await fetch(
      `http://localhost:4000?query=${getIntrospectionQuery()}`,
    );
    const json = await res.json();

    fs.writeFileSync(
      join(__dirname, '../__generated__/schema.json'),
      JSON.stringify(json, null, 2),
    );
  });
}

export default server;
