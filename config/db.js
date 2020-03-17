/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import dotenv from 'dotenv';
// import pool from './config/db_config';

/* eslint-disable linebreak-style */
import { Pool } from 'pg';

dotenv.config();
let pool;
if (
  process.env.NODE_ENV === 'development'
  || process.env.NODE_ENV === 'production'
) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL_TEST,
  });
}

pool.on('connect', () => {});


const createTables = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS 
  users (id BIGSERIAL PRIMARY KEY,email VARCHAR(128) NOT NULL UNIQUE,phone_number VARCHAR(128),nationality VARCHAR(128), first_name VARCHAR(128) NOT NULL,last_name VARCHAR(128) NOT NULL,password VARCHAR(150) NOT NULL,address VARCHAR(100),is_Admin BOOLEAN DEFAULT false, created_on TIMESTAMP DEFAULT CURRENT_DATE);
  CREATE TABLE IF NOT EXISTS posts (id BIGSERIAL PRIMARY KEY,owner INTEGER REFERENCES users(id),title VARCHAR(128) NOT NULL,imageUrl VARCHAR(128) NOT NULL,content text NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_DATE);
  CREATE TABLE IF NOT EXISTS projects (id BIGSERIAL PRIMARY KEY,owner INTEGER REFERENCES users(id),title VARCHAR(128) NOT NULL,summary VARCHAR(128) NOT NULL, githubUrl VARCHAR(128) NOT NULL,hostedUrl VARCHAR(128) NOT NULL,imageUrl VARCHAR(128) NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_DATE);
  CREATE TABLE IF NOT EXISTS feedback (id BIGSERIAL PRIMARY KEY,created_on TIMESTAMP DEFAULT NOW(),content TEXT NOT NULL,subject VARCHAR(128) NOT NULL, email VARCHAR(128) DEFAULT false);
  CREATE UNIQUE INDEX projects_title_isummary_owner_key ON projects(title text_ops,summary text_ops,owner int4_ops);`;
  pool
    .query(queryText)
    .then((res) => {
      console.log('Successful migrate');
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
};

const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users, posts, projects, flags;';
  pool
    .query(queryText)
    .then((res) => {
      console.log('Success undo migrate');
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  process.exit(0);
});

// eslint-disable-next-line import/first
module.exports = {
  createTables,
  dropTables,
  pool,
};

require('make-runnable');
