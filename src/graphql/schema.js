const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Post{
    _id: ID!
    owner: ID!
    title: String!
    content: String!
    imageUrl: String
  }

  type Project{
    _id: ID!
    owner: ID!
    title: String!
    summary: String!
    githubUrl: String
    hostedUrl: String
    imageUrl: String
  }

  input PostInpuData {
    title: String!
    content: String!
    imageUrl: String
  }

  type User {
    _id: ID!
    email: String!
    first_name: String!
    last_name: String!
    address: String!
    phone_number: String
    nationality: String
    password: String!
    is_admin: Boolean!
    projects: [Project]
    posts: [Post]
  }

  input RegisterInputData {
    first_name: String!
    last_name: String!
    phone_number: String
    nationality: String
    address: String
    password: String!
    email: String!
  }

  type AuthData {
    token: String!
    userId: String!
    email: String! 
  }

  type RootMutation{
    createUser(userInput: RegisterInputData): User!
  }

  type RootQuery{
    login(email: String!, password: String!): AuthData!
    getUser(id: ID): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
