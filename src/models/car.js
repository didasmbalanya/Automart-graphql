/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';


export const cars = [
  {
    id: 1,
    owner: 1, // user id
    created_on: 'DateTime',
    state: 'String', // new,used
    status: 'String', // sold,available - default is available
    price: 'Float',
    manufacturer: 'String',
    model: 'String',
    body_type: 'String', // car, truck, trailer, van, etc
  },

];

const availableCars = cars.map(car => car.model);
export const CarSchema = Joi.object().keys({
  state: Joi.string().valid(['new', 'used']).required(),
  status: Joi.string().valid(['sold', 'available']).default('available'),
  price: Joi.number().min(1).max(100000000000)
    .required(),
  manufacturer: Joi.string(),
  model: Joi.string().invalid(availableCars).required(),
  body_type: Joi.string().required(),
});
