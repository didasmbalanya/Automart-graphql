/* eslint-disable linebreak-style */
/* eslint-disable no-console */

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

export const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS 
  users (
        id UUID PRIMARY KEY,
        email VARCHAR(128) NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        password VARCHAR(150) NOT NULL,
        address VARCHAR(100),
        is_Admin BOOLEAN DEFAULT false
      );
       CREATE TABLE IF NOT EXISTS cars (
        id UUID PRIMARY KEY,
        owner UUID REFERENCES users(id),
        created_on DATE DEFAULT CURRENT_DATE,
        state VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        price MONEY NOT NULL,
        manufacturer VARCHAR(128) NOT NULL,
        model VARCHAR(128) NOT NULL,
        body_type VARCHAR(128) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY,
        buyer UUID REFERENCES users(id),
        car_id UUID REFERENCES cars(id),
        amount MONEY NOT NULL,
        status VARCHAR(128) DEFAULT 'pending'
      );
      CREATE TABLE IF NOT EXISTS flags (
        id UUID PRIMARY KEY,
        car_id UUID REFERENCES cars(id),
        created_on DATE DEFAULT CURRENT_DATE,
        reason TEXT NOT NULL,
        description TEXT NOT NULL
      );`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

export const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users, cars, orders, flags;';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

export const dropTable = (table) => {
  const queryText = `DROP TABLE IF EXISTS ${table};`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
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
import 'make-runnable';
