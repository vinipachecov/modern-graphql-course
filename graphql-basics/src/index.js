import { GraphQLServer } from "graphql-yoga";

const users = [
  {
    id: "1",
    name: "Vini",
    email: "v@v.com",
    age: 28
  },
  {
    id: "2",
    name: "Sara",
    email: "s@s.com",
    age: 2
  },
  {
    id: "3",
    name: "Liz",
    email: "liz@dmc.co",
    age: 29
  }
];

const posts = [
  {
    id: "1",
    title: "GraphQL 101",
    body: "creatuing stuff",
    published: true,
    author: "1"
  },
  {
    id: "2",
    title: "Node js easy",
    body: "doing stuff",
    published: true,
    author: "1"
  },
  {
    id: "3",
    title: "Programming",
    body: "whatever in graphql",
    published: true,
    author: "2"
  }
];

const comments = [
  {
    id: "1",
    text: "First comment",
    author: "2"
  },
  {
    id: "2",
    text: "Second comment",
    author: "3"
  },
  {
    id: "3",
    text: "Third comment",
    author: "1"
  },
  {
    id: "500",
    text: "Never mind...",
    author: "2"
  }
];

// Type Definitions
const typeDefs = `
  type Query {
    users(query: String): [User]!
    add(numbers: [Float]!): Float!
    posts(query: String): [Post]!
    greeting(name: String): String!
    grades: [Int]!
    me: User!
    post: Post!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int    
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
  }
`;
// Resolvers

const resolvers = {
  Query: {
    users(parent, args, context, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(
        user => user.name.toLowerCase() === args.query.toLowerCase()
      );
    },
    add(parent, args, context, info) {
      return args.numbers.reduce((acc, cur) => {
        return acc + cur;
      }, 0);
    },
    greeting(parent, args, context, info) {
      return "hello!" + args.name;
    },
    posts(parent, args, context, info) {
      if (args.query) {
        return posts.filter(post => post.id === args.query);
      } else {
        return posts;
      }
    },
    me() {
      return {
        id: "12345679",
        name: "v@v.com",
        email: "vinciius",
        age: 28
      };
    },
    grades(parent, args, context, info) {
      return [99, 80, 93];
    },
    post() {
      return {
        id: "12456",
        title: "GraphQL",
        body: "1111",
        published: false
      };
    },
    comments(parent, args, context, info) {
      return comments;
    }
  },
  Post: {
    author(parent, args, context, info) {
      return users.find(user => user.id === parent.author);
    }
  },
  User: {
    posts(parent, args, context, info) {
      return posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, context, info) {
      return comments.filter(comment => comment.author === parent.id);
    }
  },
  Comment: {
    author(parent, args, context, info) {
      return users.find(user => user.id === parent.author);
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
