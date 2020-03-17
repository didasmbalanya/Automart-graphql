import {
  createUserFunc,
  loginUser,
  getUserById,
} from './resolverFunctions/user';
import { createProject, getAllProjects } from './resolverFunctions/project';

module.exports = {
  // users
  createUser: createUserFunc,
  getUser: getUserById,
  login: loginUser,

  // Projects
  createProject,
  projects: getAllProjects, // get projects
};
