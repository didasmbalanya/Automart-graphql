import {
  createUserFunc,
  loginUser,
  getUserById,
} from './resolverFunctions/user';
import { createProject, getAllProjects } from './resolverFunctions/project';
import { createPost, getUserPosts } from './resolverFunctions/post';

module.exports = {
  // users
  createUser: createUserFunc,
  getUser: getUserById,
  login: loginUser,

  // Projects
  createProject,
  projects: getAllProjects, // get projects

  // posts
  createPost,
  posts: getUserPosts,
};
