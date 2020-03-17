export const PostType = `{
  id: ID!
  title: String!
  content: String!
  imageUrl: String
  creator: User!
  created_on: String!
}`;

export const UserType = `
{
  id: ID!
  email: String!
  first_name: String!
  last_name: String!
  address: String!
  phone_number: String
  nationality: String
  projects: [Project]
  posts: [Post]
}`;

export const ProjectType = `
{
  id: ID!
  creator: User!
  title: String!
  summary: String!
  githubUrl: String
  hostedUrl: String
  imageUrl: String!
  created_on: String!
}`;

export const AuthDataType = `
{
  token: String!
  userId: String!
  email: String! 
}`;

export const ProjectData = `
{
  projects: [Project!]!
  totalprojects: Int! 
}`;
