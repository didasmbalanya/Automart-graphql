/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';

export const users = [
  {
    id: '1',
    email: 'didasmbalanya@gmail.com',
    first_name: 'ObiOne',
    last_name: 'Kanobi',
    password: '$2b$08$WxQL5DwbwUzxORZcJCDsWuJA5CJmUcrjoaq4V.VfK3W9RVTCUrd0u', // obionekanobi
    address: 'Azgrad',
    is_admin: 'false',
  },
/* token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJlbWFpbCI6ImRpZGFzbWJhbGFueWFAZ21haWwuY29tIiwiaWF0IjoxNTYwMzMwNTkyLCJleHAiOjE1NjAzNDEzOTJ9.
DhngbDVqaiHgAKGnCID3rcrpWl6CDZJxNkPVUjI1WSk
*/
];


export const signUnSchema = Joi.object().keys({
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  address: Joi.string().min(2).max(50),
  email: Joi.string().required(),
  is_admin: Joi.boolean().default(false).valid([true, false]),
  password: Joi.string().min(7).required().strict(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().strict(),
});
