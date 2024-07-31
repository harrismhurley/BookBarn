const typeDefs = `
  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    addBook(userId: ID!, bookInput: BookInput!): User
    login(email: String!, password: String!): AuthPayload
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports =  typeDefs ;
