import { buildSchema } from 'graphql';
import {
  UserType, PostType, ProjectType, AuthDataType, ProjectData,
} from './types';
import { RegisterDataInput, PostInput, ProjectInput } from './inputTypes';

module.exports = buildSchema(`
  type Post ${PostType}
  input PostInputData ${PostInput}

  
  type Project ${ProjectType}
  input ProjectInputData ${ProjectInput}
  type ProjectData ${ProjectData}

  type User ${UserType}
  input RegisterInputData ${RegisterDataInput}

  type AuthData ${AuthDataType}

  type RootMutation{
    createUser(userInput: RegisterInputData): User!
    createProject(projectInput: ProjectInputData): Project!
  }

  type RootQuery{
    login(email: String!, password: String!): AuthData!
    getUser(id: ID): User!
    projects: ProjectData!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
