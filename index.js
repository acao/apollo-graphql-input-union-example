const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`

  input Cat {
    name: String
    purr: Boolean
  }

  input Dog {
    name: String
    woof: Boolean
  }

  inputUnion Pet = Cat | Dog

  type Query {
    pet(input: Pet): String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    pet: (_, args) => JSON.stringify(args, null, 2)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
