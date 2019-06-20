/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';
import pool from '../../config/db_config';

chai.use(chaiHttp);
chai.should();

const storedUser = {
  first_name: 'didas',
  last_name: 'Mbalanya',
  email: 'didasmbalanya@gmail.com',
  address: 'Nairobi',
  password: 'obionekanobi',
  confirm_password: 'obionekanobi',
};
const what = storedUser.email;
const { secret } = process.env;
const token = jwt.sign({ what }, secret, { expiresIn: '3h' });


describe('Users', () => {
  
  describe('/GET root page and current logged in user', () => {
    it('should get all the api welcome page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
  });
  describe('/POST user', () => {
    it('should be able to create an new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(storedUser)
        .end((err, res) => {
          res.should.have.status(201);
        });
      done();
    });
    it('should not be able to create an already signed up user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(storedUser)
        .end((err, res) => {
          res.should.have.status(409);
        });
      done();
    });

    it('should not be able to signin a non registered user', (done) => {
      const newUser = { email: 'didaskantobi@gmail.com', password: 'obionekanobi' };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(409);
        });
      done();
    });

    it('a registered user can not signin with wrong password', (done) => {
      const signInUser = { email: 'didasmbalanya@gmail.com', password: 'obi1dsdskanobil' };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(signInUser)
        .end((err, res) => {
          res.should.have.status(404);
        });
      done();
    });

    it('a registered user can signin with right password', (done) => {
      const usertwo = { email: 'didasmbalanya@gmail.com', password: 'obionekanobi' };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(usertwo)
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
  });
});

describe('Other tests', () => {
  it('should get the currently logged in user after authorization', (done) => {
    chai.request(app)
      .get('/api/v1/auth/users/me')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});
