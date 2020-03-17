/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import { projectSchema, saveProject } from '../../models/project';
import { getFromTwoModels } from '../../models';

/* eslint-disable no-unused-vars */
export const createProject = async ({ projectInput }, req) => {
  if (!req.isAuth) {
    const error = new Error('Not Authenticated');
    error.code = 401;
    throw error;
  }
  const { user } = req;
  try {
    await projectSchema.validateAsync(projectInput);
    let {
      title, summary, githubUrl, hostedUrl, imageUrl,
    } = projectInput;
    title = title.trim();
    summary = summary.trim();
    githubUrl = githubUrl.trim();
    hostedUrl = hostedUrl.trim();
    imageUrl = imageUrl.trim();
    const owner = user.id;

    const saved = await saveProject([
      title,
      summary,
      githubUrl,
      hostedUrl,
      imageUrl,
      owner,
    ]);

    return { ...saved, creator: user };
  } catch (e) {
    if (e.isJoi) {
      const error = new Error('Invalid input');
      error.data = { message: e.details[0].message };
      error.code = 422;
      throw error;
    }
    throw e;
  }
};

export const getAllProjects = async (args, req) => {
  const projects = await getFromTwoModels('users', 'projects', 'id', 'owner');

  const data = projects.rows.map((project) => {
    const {
      password,
      owner,
      email,
      first_name,
      last_name,
      address,
      phone_number,
      nationality,
      ...sanitaizedData
    } = project;
    sanitaizedData.creator = {
      id: project.owner,
      email: project.email,
      first_name: project.first_name,
      last_name: project.last_name,
      address: project.address,
      phone_number: project.phone_number,
      nationality: project.nationality,
    };
    sanitaizedData.created_on = project.created_on.toString();
    return sanitaizedData;
  });
  return { projects: data, totalprojects: projects.rowCount };
};
