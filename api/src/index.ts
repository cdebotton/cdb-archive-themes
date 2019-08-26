import Photon, { MediaArgs, FindManyMediaArgs } from '@generated/photon';
import { ApolloServer, gql } from 'apollo-server-micro';
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { S3 } from 'aws-sdk';
import { PassThrough } from 'stream';
import microCors from 'micro-cors';

import { Context } from './types';
import { IResolvers } from './__generated__/graphql';
import { IncomingMessage, ServerResponse } from 'http';

const {
  JWT_SECRET = 'SECRET',
  SPACES_SPACE,
  SPACES_SECRET,
  SPACES_KEY,
  SPACES_ENDPOINT,
} = process.env;

if (!SPACES_ENDPOINT) {
  throw new Error(`process.env.SPACES_ENDPOINT is undefined`);
}

if (!SPACES_SPACE) {
  throw new Error(`process.env.SPACES_SPACE is undefined`);
}

const s3 = new S3({
  endpoint: process.env.SPACES_ENDPOINT,
  secretAccessKey: SPACES_SECRET,
  accessKeyId: SPACES_KEY,
});

const photon = new Photon();

const typeDefs = gql`
  scalar DateTime
  scalar File

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

  type Media {
    id: ID!
    author: User!
    key: String!
    etag: String!
    bucket: String!
    mimetype: String!
    encoding: String!
    deleted: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type SignedMedia {
    id: ID!
    url: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: Boolean!
    author: User!
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
    media: [Media!]!
  }

  type Query {
    viewer: User!
    gallery(where: GalleryWhereArgs!): Gallery!
    galleries(where: GalleryWhereArgs): [Gallery!]!
    user(id: ID!, email: String): User!
    allMedia(where: MediaWhereArgs): [SignedMedia!]!
    users: [User!]!
  }

  type Mutation {
    createUser(data: CreateUserArgs!): User!
    updateUser(data: UpdateUserArgs!): User!
    deleteUser(id: ID!): User!
    createGallery(data: CreateGalleryArgs!): Gallery!
    updateGallery(data: UpdateGalleryArgs!, where: GalleryWhereArgs!): Gallery!
    deleteGallery(id: ID!): Gallery!
    login(data: LoginArgs!): String!
    createMedia(data: CreateMediaArgs!): Media!
    deleteMedia(where: MediaWhereArgs!): Media!
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

  input GalleryWhereArgs {
    deleted: Boolean
    id: ID
  }

  input CreateGalleryArgs {
    uri: String!
    title: String!
    description: String!
    publishedAt: DateTime
  }

  input UpdateGalleryArgs {
    uri: String!
    title: String!
    description: String!
    publishedAt: DateTime
  }

  input CreateMediaArgs {
    title: String!
    file: File!
  }

  input MediaWhereArgs {
    id: ID
    in: [ID!]
  }
`;

const resolvers: IResolvers<Context> = {
  Query: {
    async viewer(parent, args, { photon, token }) {
      if (!token) {
        throw new Error('No token');
      }

      const userId = await jwt.verify(token, JWT_SECRET);

      if (typeof userId !== 'string') {
        throw new Error('Invalid JWT');
      }

      return await photon.users.findOne({ where: { id: userId } });
    },

    user(parent, args, { photon }) {
      if (!(args.id || args.email)) {
        throw new Error('You must specify an id or email to find a user.');
      }

      return photon.users.findOne({ where: { id: args.id } });
    },

    users(parent, args, { photon }) {
      return photon.users.findMany();
    },
    async gallery(parent, { where }, { photon }) {
      const gallery = await photon.galleries.findOne({
        where,
        include: { media: { include: { author: true } }, author: true },
      });
      return gallery;
    },
    async galleries(parent, args, { photon, token }) {
      if (!token) {
        throw new Error('No token');
      }

      const userId = await jwt.verify(token, JWT_SECRET);

      let deleted = false;
      if (
        args &&
        args.where &&
        args.where.deleted &&
        typeof userId !== 'string'
      ) {
        deleted = args.where.deleted;
      }

      if (!userId) {
        deleted = false;
      }

      return photon.galleries.findMany({
        include: { media: { include: { author: true } } },
        where: { deleted },
      });
    },
    async allMedia(parent, { where }, { photon }) {
      const lookup: FindManyMediaArgs = {
        include: { author: true },
      };

      if (where && where.id) {
        lookup.where = { id: where.id };
      }

      if (where && where.in) {
        lookup.where = { id: { in: where.in } };
      }

      const media = await photon.media.findMany(lookup);

      return media.map(media => {
        return {
          id: media.id,
          url: s3.getSignedUrl('getObject', {
            Key: media.key,
            Bucket: media.bucket,
          }),
          deleted: media.deleted,
          createdAt: media.createdAt,
          updatedAt: media.updatedAt,
          author: (media as any).author,
        };
      });
    },
  },
  Mutation: {
    async createUser(parent, args, { photon }) {
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
    async updateUser(parent, args, { photon }) {
      const data: Record<string, string | null | undefined> = {
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
    async deleteUser(parent, args, { photon, token }) {
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
    async createGallery(parent, args, { photon, token }) {
      if (!token) {
        throw new Error('No token');
      }

      const userId = await jwt.verify(token, JWT_SECRET);

      if (typeof userId !== 'string') {
        throw new Error('Invalid token');
      }

      const gallery = await photon.galleries.create({
        data: {
          title: args.data.title,
          description: args.data.description,
          uri: args.data.uri,
          publishedAt: args.data.publishedAt,
          createdAt: new Date(),
          updatedAt: new Date(),
          author: { connect: { id: userId } },
        },
        include: { media: { include: { author: true } } },
      });

      return gallery;
    },
    updateGallery(parent, { data, where }, { photon }) {
      return photon.galleries.update({
        where: { id: where.id },
        data,
        include: { media: { include: { author: true } } },
      });
    },
    async deleteGallery(parent, args, { photon }) {
      return await photon.galleries.update({
        where: { id: args.id },
        data: { deleted: true },
        include: { media: { include: { author: true } } },
      });
    },
    async createMedia(parent, { data }, { photon, token }) {
      if (!token) {
        throw new Error('No token');
      }

      const userId = await jwt.verify(token, JWT_SECRET);

      if (typeof userId !== 'string') {
        throw new Error('Invalid JWT');
      }

      const file = await data.file;

      const stream = file.createReadStream();
      const pass = new PassThrough();
      stream.pipe(pass);

      const config = {
        Bucket: SPACES_SPACE,
        Key: file.filename,
        Body: pass,
      };

      const { Bucket, Key, ETag } = await s3.upload(config).promise();

      const media = await photon.media.create({
        data: {
          bucket: Bucket,
          key: Key,
          etag: ETag,
          mimetype: file.mimetype,
          encoding: file.encoding,
          author: { connect: { id: userId } },
        },
        include: { author: true },
      });

      return media;
    },
    async deleteMedia(parent, { where }, { photon }) {
      return photon.media.delete({ where, include: { author: true } });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    const [, token] = req.headers.authorization
      ? req.headers.authorization.split(' ')
      : '';

    return { photon, token };
  },
});

const cors = microCors();
const apolloHandler = server.createHandler({ path: '/graphql' });
export const config = {
  api: {
    bodyParser: false,
  },
};

function optionsHandler(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }
  return apolloHandler(req, res);
}

export default cors(optionsHandler);
