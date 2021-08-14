const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Comment {
    _id: ID!
    tale: Tale!
    user: User!
    text: String!
    createdAt: String!
    updatedAt: String!
}

type Tale {
  _id: ID!
  title: String!
  text: String!
  date: String!
  creator: User!
  comments: [Comment]
}

type User {
  _id: ID!
  email: String!
  password: String
  createdTales: [Tale!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input TaleInput {
  title: String!
  date: String!
  text: String!
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
    tales: [Tale!]!
    comments: [Comment]
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createTale(taleInput: TaleInput): Tale
    createUser(userInput: UserInput): User
    commentTale(taleId: ID!, text: String!): Comment!
    deleteComment(commentId: ID!): Tale!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
