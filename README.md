# GraphQL Course

GraphQL is certainly a hot topic on backend applications as it gives us a new way of querying data from the backend to the client and allowing more customization in the query than normal RESTful APIs.

GraphQL stands for Graph Query Language, so it is not a backend server but a query language, like a layer infront of the backend to give the client side more power to filter data on our resource endpoints.

resources:

## Basic Example

Here a basic example which would start a server with GraphQL support running on port 4000.

```js
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
```

Here we can see most of the basic structure of GraphQL:

1. TypeDefs: The data type definitions of the data we are querying
2. Resolvers : The queries and mutations we will allow users to do and how they should be handled by GraphQL

### Mutations

Mutations are the operations in the GraphQL grammar which are related to changing our data, just like endpoints with POST, PUT, DELETE verbs in REST.

### Queries

Queries in GraphQL are the operation in which we fetch resources from our endpoints in a GET request.

## Resolver Signature function

Resolver are the "Services" in the MVC architecture, they are the abstraction used to resolve a resource request to GraphQL and the operation into which it should do.

It's signature is like this:

```js
add(parent, args, context, info) {
      return args.a + args.b;
    },
```

1. parent: data from the resolver method we are using
2. args: arguments sent due to the resolver function signature
3. context: the data passed through the server middleware
4. info: information about the query we are abount to make

## Args

Args are extremelly common to use as we usually send data through it. Instead of fetching stuff from body or query, everything comes from args.
In other words, a mutation that would delete a comment:

```
mutation{
  deleteComment(id: 3) {
    	id
    text
	}
}
```

Would receive this "id" in the resolver like this:

```
 deleteComment(parent, args, { db }, info) {
      const commentIndex = db.comments.findIndex(
        comment => comment.id === args.id
      );

      if (commentIndex === -1) {
        throw new Error("Comment not found");
      }

      const [removedIndex] = db.comments.splice(commentIndex, 1);

      return removedIndex;
    }
```

## Context

Context can be used as a fast way to improve flexibility of our resolvers on how they access important variables such as a database connection.

```
const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: {
    db  // some sort of database connection (sequelize, knex or something like this)
  }
});
```
