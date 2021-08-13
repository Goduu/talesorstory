const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking {
    _id: ID!
    tale: Tale!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Tale {
  _id: ID!
  title: String!
  text: String!
  date: String!
  creator: User!
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
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createTale(taleInput: TaleInput): Tale
    createUser(userInput: UserInput): User
    bookTale(taleId: ID!): Booking!
    cancelBooking(bookingId: ID!): Tale!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
