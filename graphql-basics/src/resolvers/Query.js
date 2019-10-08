const Query = {
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
};

export { Query as default };
