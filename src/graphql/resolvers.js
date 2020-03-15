/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { signUnSchema, addNewUser } from '../models/user';
import { getBy } from '../models/car';

const { SECRET } = process.env;

module.exports = {
  createUser: async ({ userInput }, req) => {
    let message;
    try {
      let {
        first_name, last_name, email, address, password,
      } = userInput;
      const validated = await signUnSchema.validateAsync(userInput);

      first_name = first_name.trim();
      address = address.trim();
      last_name = last_name.trim();
      email = email.trim();
      password = password.trim();

      const foundUser = await getBy('users', 'email', email);
      if (foundUser) {
        message = 'User exists already!';
        const error = new Error(message);
        throw Error;
      }

      const hashPassword = await bcrypt.hash(password, 8);
      const token = jwt.sign({ email }, SECRET, { expiresIn: '3h' });
      const values = [first_name, last_name, email, address, hashPassword];
      let createdUser = await addNewUser(values);
      createdUser = createdUser.rows[0];
      return {
        ...createdUser,
        _id: createdUser.id.toString(),
      };
    } catch (e) {
      if (e.isJoi) {
        const error = new Error(e.details[0].message);
        throw error;
      }
      return e.message;
    }
  },

  getUser: async ({ id }, req) => {
    const foundUser = await getBy('users', 'id', id);
    return { ...foundUser[0], _id: foundUser[0].id.toString() };
  },
};
