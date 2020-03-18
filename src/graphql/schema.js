import { buildSchema } from 'graphql';
import {
  UserType,
  PostType,
  ProjectType,
  AuthDataType,
  ProjectData,
  PostData,
  PaginationType
} from './types/types';
import { RegisterDataInput, PostInput, ProjectInput } from './types/inputTypes';

module.exports = buildSchema(`
  type Post ${PostType}
  input PostInputData ${PostInput}
  type PostData ${PostData}

  
  type Project ${ProjectType}
  input ProjectInputData ${ProjectInput}
  type ProjectData ${ProjectData}

  type User ${UserType}
  input RegisterInputData ${RegisterDataInput}

  type AuthData ${AuthDataType}

  type PaginationData ${PaginationType}

  type RootMutation{
    createUser(userInput: RegisterInputData): User!
    createProject(projectInput: ProjectInputData): Project!
    createPost(postInput: PostInputData): Post!
  }

  type RootQuery{
    login(email: String!, password: String!): AuthData!
    getUser(id: ID): User!
    projects: ProjectData!
    posts(page: Int, perPage: Int): PostData
    post(id: ID!): Post!
    project(id: ID!): Project!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
