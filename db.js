/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import dotenv from 'dotenv';
import pool from './config/db_config';

dotenv.config();
console.log(process.env.NODE_ENV);

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTables = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS 
  users (
        id BIGSERIAL PRIMARY KEY,
        email VARCHAR(128) NOT NULL UNIQUE,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        password VARCHAR(150) NOT NULL,
        address VARCHAR(100),
        is_Admin BOOLEAN DEFAULT false
      );
       CREATE TABLE IF NOT EXISTS cars (
        id BIGSERIAL PRIMARY KEY,
        owner INTEGER REFERENCES users(id),
        created_on DATE DEFAULT CURRENT_DATE,
        state VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        price MONEY NOT NULL,
        manufacturer VARCHAR(128) NOT NULL,
        model VARCHAR(128) NOT NULL,
        body_type VARCHAR(128) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS orders (
        id BIGSERIAL PRIMARY KEY,
        buyer INTEGER REFERENCES users(id),
        car_id INTEGER REFERENCES cars(id),
        amount MONEY NOT NULL,
        status VARCHAR(128) DEFAULT 'pending'
      );
      CREATE TABLE IF NOT EXISTS flags (
        id BIGSERIAL PRIMARY KEY,
        car_id INTEGER REFERENCES cars(id),
        created_on DATE DEFAULT CURRENT_DATE,
        reason TEXT NOT NULL,
        description TEXT NOT NULL
      );`;
  await pool.query(queryText)
    .then((res) => {
      console.log(res[0].command);
    })
    .catch((err) => {
      console.log(err);
    });
};

const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users, cars, orders, flags;';
  pool.query(queryText)
    .then((res) => {
      console.log('dropped');
    })
    .catch((err) => {
      console.log(err);
    });
};

const dropTable = (table) => {
  const queryText = `DROP TABLE IF EXISTS ${table};`;
  pool.query(queryText)
    .then((res) => {
      console.log(res[0].command);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

// eslint-disable-next-line import/first
module.exports = {
  createTables,
  dropTables,
  dropTable,
  pool,
};
require('make-runnable');
