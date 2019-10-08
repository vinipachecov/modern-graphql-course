import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Subscription from "./resolvers/Subscription";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
    Subscription
  },
  context: {
    db,
    pubsub
  }
});

server.start(() => {
  console.log("Running graphQL server!");
});
