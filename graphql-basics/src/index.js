import { GraphQLServer } from "graphql-yoga";
import uuidV4 from "uuid/v4";
import db from "./db";

// Type Definitions

// Resolvers

const resolvers = {
  Mutation: {
    createUser(parent, args, { db }, info) {
      const emailTaken = db.users.some(user => user.email === args.data.email);
      if (emailTaken) {
        throw new Error("Email has already been taken");
      }

      const user = {
        id: uuidV4(),
        ...args.data
      };

      db.users.push(user);
      return user;
    },
    createPost(parent, args, { db }, info) {
      const userExits = db.users.some(user => user.id === args.data.author);
      if (!userExits) {
        throw new Error("User does not exists!");
      }

      const post = {
        id: uuidV4(),
        ...args.data
      };

      db.posts.push(post);

      return post;
    },
    createComment(parent, args, { db }, info) {
      const userExits = db.users.some(user => user.id === args.data.author);
      const postExists = db.posts.some(
        post => post.id === args.data.post && post.published
      );
      if (!userExits || !postExists) {
        throw new Error("Unable to find user or post");
      }

      const comment = {
        id: uuidV4(),
        ...args.data
      };

      db.comments.push(comment);

      return comment;
    },
    deleteUser(parent, args, { db }, info) {
      // find user to be deleted
      const userIndex = db.users.findIndex(user => user.id === args.id);

      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const removedUsed = db.users.splice(userIndex, 1);

      db.posts = db.posts.filter(post => {
        const match = post.author === args.id;

        if (match) {
          db.comments = db.comments.filter(comment => comment.post !== post.id);
        }
        return match;
      });

      db.comments = db.comments.filter(comment => comment.author !== args.id);
      return removedUsed[0];
    },
    deletePost(parent, args, { db }, info) {
      const postIndex = db.posts.findIndex(post => post.id === args.id);

      if (postIndex === -1) {
        throw new Error("Post not found!");
      }

      db.comments = db.comments.filter(comment => comment.post !== args.id);

      const removedPost = db.posts.splice(postIndex, 1);
      return removedPost[0];
    },
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
  },
  Query: {
    users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users;
      }
      return db.users.filter(
        user => user.name.toLowerCase() === args.query.toLowerCase()
      );
    },
    add(parent, args, { db }, info) {
      return args.numbers.reduce((acc, cur) => {
        return acc + cur;
      }, 0);
    },
    greeting(parent, args, { db }, info) {
      return "hello!" + args.name;
    },
    posts(parent, args, { db }, info) {
      if (args.query) {
        return db.posts.filter(post => post.id === args.query);
      } else {
        return db.posts;
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
    grades(parent, args, { db }, info) {
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
    comments(parent, args, { db }, info) {
      return db.comments;
    }
  },
  Post: {
    author(parent, args, { db }, info) {
      return db.users.find(user => user.id === parent.author);
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(comment => comment.post === parent.id);
    }
  },
  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(comment => comment.author === parent.id);
    }
  },
  Comment: {
    author(parent, args, { db }, info) {
      return db.users.find(user => user.id === parent.author);
    },
    post(parent, args, { db }, info) {
      return db.posts.find(post => post.id === parent.post);
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: {
    db
  }
});

server.start(() => {
  console.log("Running graphQL server!");
});
