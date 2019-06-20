/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import { getPublicProfile } from '../utils/user_utils';

chai.should();


const tryUser = {
  first_name: 'dexter',
  last_name: 'didas',
  email: 'didasdexter@gmail.com',
  address: 'Nairobi',
  password: 'obionekanobi',
  confirm_password: 'obionekanobi',
};

describe('Get public user data object', () => {
  it('should return an object with public data', () => {
    const result = getPublicProfile(tryUser);
    result.should.be.an('object');
    result.should.not.have.property('password');
  });
});
