import pool from '../../config/db_config';

export const savePost = async (values) => {
  const newPost = await pool.query(
    `INSERT INTO posts(
      owner,
      title,
      content,
      imageUrl) VALUES($1,$2,$3,$4) returning *`,
    values,
  );
  return newPost.rows ? newPost.rows[0] : newPost;
};

export const str = '';
