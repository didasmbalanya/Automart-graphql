import {
  createUserFunc,
  loginUser,
  getUserById,
} from './resolverFunctions/user';
import { createProject, getAllProjects, getOneProject } from './resolverFunctions/project';
import { createPost, getUserPosts, getOnePost } from './resolverFunctions/post';

module.exports = {
  // users
  createUser: createUserFunc,
  getUser: getUserById,
  login: loginUser,

  // Projects
  createProject,
  projects: getAllProjects, // get projects
  project: getOneProject,

  // posts
  createPost,
  posts: getUserPosts,
  post: getOnePost,
};
