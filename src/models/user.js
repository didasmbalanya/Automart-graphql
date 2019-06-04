/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';

export const signUnSchema = Joi.object().keys({
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  address: Joi.number().integer().min(1900).max(2013),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  is_admin: Joi.boolean().default(false),
  password: Joi.string().min(7).required().strict(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().strict(),
});

export const users = [
  {
    id: 'Integer',
    email: 'String',
    first_name: 'String',
    last_name: 'String',
    password: 'Stringlk',
    address: 'String',
    is_admin: 'Boolean',
  },

];
