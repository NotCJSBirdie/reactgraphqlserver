const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    users: UsersResult
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  type User {
    id: ID!
    name: String!
    age: Int!
    username: String!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  input CreateUserInput {
    name: String!
    age: Int!
    username: String!
    nationality: Nationality = BRAZIL
  }

  input UpdateUsernameInput {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): User
  }

  type UsersSuccessfulResult {
    users: [User!]!
  }

  type UsersErrorResult {
    message: String!
  }

  union UsersResult = UsersSuccessfulResult | UsersErrorResult

  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
    UKRAINE
  }
`;

// EVERY GRAPHQL STARTS with a type Query which is the most advanced ever

// Error Handling done by putting a union box between UsersSuccessfulResult and UsersErrorResult by that definition you also have to create a resolver in resolvers.js called UsersResult to resolve the union defined in typedefs.js

//enum are used to limit the number of choices a data can be. meaning that it will an throw an error when you are querying that doesn't match any of the choices inside of an enum

module.exports = { typeDefs };
