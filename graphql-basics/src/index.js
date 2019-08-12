import { GraphQLServer } from "graphql-yoga";

// Type Definitions
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    isStock: Boolean!
  }
`;
// Resolvers

const resolvers = {
  Query: {
    title() {
      return "The war of art";
    },
    price() {
      return 12.99;
    },
    releaseYear() {
      return 5;
    },
    isStock() {
      return true;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("Running graphQL server!");
});
