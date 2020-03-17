/* eslint-disable camelcase */
import pool from '../../config/db_config';

export const getBy = async (table, key, value) => {
  const result = await pool.query(
    `SELECT * FROM ${table} WHERE ${key}='${value}';`,
  );
  if (result.rows.length === 0) return false;
  return result.rows;
};

export const updatePriceId = async (id, price) => {
  const result = await pool.query(
    `UPDATE cars SET price='${price}' WHERE id='${id}' RETURNING *`,
  );
  return result;
};

export const getAll = async (model) => {
  const result = await pool.query(`SELECT * FROM ${model};`);
  return result;
};

export const DeleteCarId = async (id) => {
  const result = await pool.query(
    `DELETE FROM cars WHERE id='${id}' returning *`,
  );
  return result;
};

export const getFromTwoModels = async (
  pkModel,
  fkModel,
  primaryKeyMain,
  foreignKey,
) => {
  const result = await pool.query(`SELECT
  ${pkModel}.*,
  ${fkModel}.*
  FROM
  ${pkModel}
  INNER JOIN ${fkModel} ON ${pkModel}.${primaryKeyMain} = ${fkModel}.${foreignKey};`);
  const totalposts = result.rowCount;
  const data = result.rows.map((post) => {
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
    } = post;
    sanitaizedData.creator = {
      id: post.owner,
      email: post.email,
      first_name: post.first_name,
      last_name: post.last_name,
      address: post.address,
      phone_number: post.phone_number,
      nationality: post.nationality,
    };
    sanitaizedData.created_on = post.created_on.toString();
    return sanitaizedData;
  });
  return { data, count: totalposts };
};
