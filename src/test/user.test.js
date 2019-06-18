/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';
import { createTables, dropTables } from '../../db';
import { addNewUser } from '../models/user';

chai.use(chaiHttp);
chai.should();

export const storedUser = {
  first_name: 'Strfgfging',
  last_name: 'didsda',
  email: 'didasmbalanya@gmail.com',
  password: 'passjijij',
  confirm_password: 'passjijij',
  is_admin: 'false',
};

const dummy = {
  first_name: 'Dexter',
  last_name: 'Didss',
  email: 'didasmbalanya1@gmail.com',
  address: 'Nairobi',
  password: 'kenya123',
  confirm_password: 'kenya123',
};


const { secret } = process.env;
export const token = jwt.sign({ email: storedUser.email, is_admin: storedUser.is_admin }, secret, { expiresIn: '3h' });
// parent Block
describe('Users', async () => {
  await beforeEach(async () => {
    // await dropTables();
    await createTables();
    await addNewUser(storedUser);
  });

  describe('/GET root page and current logged in user', () => {
    it('should get all the api welcome page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should get the currently logged in user after authorization', (done) => {
      chai.request(app)
        .get('/api/v1/auth/users/me')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) res.should.have.status(404);
          res.should.have.status(200);
        });
      done();
    });
  });

  describe('/POST user', () => {
    it('should not be able to create an already signed up user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(storedUser)
        .end((err, res) => {
          if (err) err.should.have.status(404);
          res.should.have.status(422);
          done();
        });
    });

    it('should be able to add new users', (done) => {
      storedUser.email = 'didasdexter@gmail.com';
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(dummy)
        .end((err, res) => {
          if (err) err.should.have.status(404);
          res.should.have.status(201);
        });
      done();
    });

    it('should not be able to signin a non registered user', (done) => {
      const newUser = { email: 'didassexter@gmaiil.com', password: 'obionekanobi' };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(newUser)
        .end((err, res) => {
          if (err) err.should.have.status(404);
          res.should.have.status(422);
        });
      done();
    });

    it('a registered user can not signin with wrong password', (done) => {
      const signInUser = { email: 'didasmbalanya@gmail.com', password: 'lobionekanobi' };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(signInUser)
        .end((err, res) => {
          if (err) err.should.have.status(404);
          res.should.have.status(422);
        });
      done();
    });

    it('a registered user can signin with right password', (done) => {
      const usertwo = { email: 'didasmbalanya@gmail.com', password: 'obionekanobi' };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(usertwo)
        .end((err, res) => {
          if (err) err.should.have.status(404);
          res.should.have.status(200);
        });
      done();
    });
  });
});
