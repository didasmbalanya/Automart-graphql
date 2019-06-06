/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';

export const users = [
  {
    id: '1',
    email: 'obiOneKanobi@gmail.com',
    first_name: 'ObiOne',
    last_name: 'Kanobi',
    password: 'obionekanobi',
    address: 'Azgrad',
    token: 'dummytoken',
    is_admin: 'Boolean',
  },

];

const availableEmails = users.map(user => user.email);
export const signUnSchema = Joi.object().keys({
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  address: Joi.string().min(2).max(50),
  email: Joi.string().invalid(availableEmails).email({ minDomainSegments: 2 }).required(),
  is_admin: Joi.boolean().default(false),
  password: Joi.string().min(7).required().strict(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().strict(),
});
