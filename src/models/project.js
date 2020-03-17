import Joi from '@hapi/joi';
import pool from '../../config/db_config';

export const projectSchema = Joi.object({
  title: Joi.string().required().min(3),
  summary: Joi.string().min(3).required(),
  githubUrl: Joi.string().min(3).required(),
  hostedUrl: Joi.string().min(3),
  imageUrl: Joi.string().min(3),
});

export const saveProject = async (values) => {
  const newProject = await pool.query(`INSERT INTO projects(
    title,
    summary,
    githubUrl,
    hostedUrl,
    imageUrl,
    owner) VALUES($1,$2,$3,$4,$5,$6) returning *`, values);
  return newProject.rows ? newProject.rows[0] : newProject;
};


export const updatePOPriceId = async (id, price) => {
  const result = await pool.query(`UPDATE orders SET new_price_offered='${price}' WHERE id='${id}' RETURNING *`);
  return result;
};

export const orderId = async (id) => {
  const result = await pool.query(`SELECT * FROM orders WHERE id='${id}';`);
  if (result.rows.length === 0) return false;
  return result.rows[0];
};
