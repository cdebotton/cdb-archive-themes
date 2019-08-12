// import Photon from '@generated/photon';
import { ApolloServer, gql } from 'apollo-server-micro';
// import { genSalt, hash, compare } from 'bcrypt';
// import jwt from 'jsonwebtoken';

// import { Context } from './types';

// const { JWT_SECRET } = process.env;

// const photon = new Photon();

const typeDefs = gql`
  scalar DateTime

  type User {
    id: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    firstName: String
    lastName: String
    lastLogin: DateTime
  }

  type Query {
    viewer: User
    user(id: String, email: String): User
    users: [User!]!
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
      firstName: String
      lastName: String
    ): User!

    login(email: String!, password: String!): String!
  }
`;

const user = {
  id: '123213',
  email: 'weqe@eqweqw.com',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  firstName: 'Christian',
  lastName: 'de Botton',
  lastLogin: null,
};

const resolvers = {
  Query: {
    async viewer(parent, args, { photon, token }) {
      return user;
    },
    user(parent, args, { photon }) {
      if (!(args.id || args.email)) {
        throw new Error('You must specify an id or email to find a user.');
      }

      return user;
    },

    users() {
      return [user];
    },
  },
  Mutation: {
    async createUser(parent, args, { photon }) {
      // const salt = await genSalt(10);
      // const password = await hash(args.password, salt);

      return user;
    },
    async login(parent, args, { photon }) {
      // if (!JWT_SECRET) {
      //   throw new Error(`process.env.TOKEN_KEY hasn't been set.`);
      // }

      // const user = await photon.users.findOne({
      //   where: { email: args.email },
      // });

      // if (!user) {
      //   throw new Error('Bad credentials');
      // }

      // if (!(await compare(args.password, user.password))) {
      //   throw new Error('Bad credentials');
      // }

      // return jwt.sign(user.id, JWT_SECRET);
      return 'ewqewqe123412j8491jh2r';
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context({ req }) {
    const [, token] = req.headers.authorization
      ? req.headers.authorization.split(' ')
      : '';

    return { token };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
