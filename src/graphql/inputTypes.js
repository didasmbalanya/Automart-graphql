export const RegisterDataInput = `
{
  first_name: String!
  last_name: String!
  phone_number: String
  nationality: String
  address: String
  password: String!
  email: String!
}`;

export const PostInput = `
{
  title: String!
  content: String!
  imageUrl: String
}`;

export const ProjectInput = `
{ title: String!
  summary: String!
  githubUrl: String
  hostedUrl: String
  imageUrl: String
}`;
