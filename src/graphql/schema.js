const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Order{
    _id: ID!
    buyer: ID!
    car_id: ID!
    price_offered: Int!
    status: String!
  }

  type Car{
    _id: ID!
    owner: ID!
    state: String!
    status: String!
    price: String!
    manufacturer: String!
    model: String!
    body_type:String!
  }

  type User {
    _id: ID!
    email: String!
    first_name: String!
    last_name: String!
    address: String!
    password: String!
    is_admin: Boolean!
    cars: [Car]
    orders: [Order]
  }

  input RegisterInputData {
    first_name: String!
    last_name: String!
    address: String!
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
