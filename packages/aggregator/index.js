const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { AccountsAPI } = require('./datasources');

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
  }

  extend type Query {
    user(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    user(_, { id }, { dataSources }) {
      return dataSources.AccountsAPI.getUser(id);
    },
  },
  User: {
    __resolveReference(reference, { dataSources }) {
      return dataSources.AccountsAPI.getUser(reference.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources: () => {
    return {
      AccountsAPI: new AccountsAPI(),
    };
  },
});

server
  .listen({ port: 4001 })
  .then(({ url }) => {
    console.log(`Aggregator ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
