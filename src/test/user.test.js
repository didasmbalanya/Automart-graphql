/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';
// import { createTables, dropTables } from '../../db';

chai.use(chaiHttp);
chai.should();

const storedUser = {
  first_name: 'dexter',
  last_name: 'didas',
  email: 'didasdexter@gmail.com',
  address: 'Nairobi',
  password: 'obionekanobi',
  confirm_password: 'obionekanobi',
};

const { secret } = process.env;
const token = jwt.sign({ email: storedUser.email }, secret, { expiresIn: '3h' });

describe.skip('Users', () => {
  it('should be able to add new users', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(storedUser)
      .end((err, res) => {
        if (err) err.should.have.status(404);
        res.should.have.status(201);
      });
    done();
  });
  describe.skip('/GET root page and current logged in user', () => {
    it('should get all the api welcome page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
        })
        done()
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
    it.skip('should not be able to create an already signed up user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(storedUser)
        .end((err, res) => {
          if (err) err.should.have.status(404);
          res.should.have.status(422);
        });
      done();
    });

    it.skip('should not be able to signin a non registered user', (done) => {
      const newUser = { email: 'didasdexter@gmail.com', password: 'obionekanobi' };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(newUser)
        .end((err, res) => {
          if (err) err.should.have.status(404);
          res.should.have.status(404);
        });
      done();
    });

    it.skip('a registered user can not signin with wrong password', (done) => {
      const signInUser = { email: 'didasmbalanya@gmail.com', password: 'obi1kanobil' };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(signInUser)
        .end((err, res) => {
          if (err) err.should.have.status(422);
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
          if (err) err.should.have.status(404);
          res.should.have.status(200);
        });
      done();
    });
  });
});
