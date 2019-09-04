let users = [
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

let posts = [
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

let comments = [
  {
    id: "1",
    text: "First comment",
    author: "2",
    post: "1"
  },
  {
    id: "2",
    text: "Second comment",
    author: "3",
    post: "2"
  },
  {
    id: "3",
    text: "Third comment",
    author: "1",
    post: "3"
  },
  {
    id: "500",
    text: "Never mind...",
    author: "2",
    post: "2"
  }
];

module.exports = {
  users,
  posts,
  comments
}