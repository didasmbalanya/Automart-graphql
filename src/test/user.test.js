/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';

chai.use(chaiHttp);
chai.should();

export const storedUser = {
  first_name: 'didas',
  last_name: 'Mbalanya',
  email: 'didasmbalanya@gmail.com',
  address: 'Nairobi',
  password: 'obionekanobi',
  confirm_password: 'obionekanobi',
};
const { SECRET } = process.env;
export const token = jwt.sign({ email: storedUser.email }, SECRET, { expiresIn: '3h' });

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

  describe('/POST USER methods', () => {
    it('should be able to signup a new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(storedUser)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it('should not be able to signup an already signed up user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(storedUser)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });

    it('should return 405 for right path with wrong method request', (done) => {
      chai.request(app)
        .put('/api/v1/auth/signup')
        .send(storedUser)
        .end((err, res) => {
          res.should.have.status(405);
          done();
        });
    });

    it('should not be able to signup with invalid email signed up user', (done) => {
      storedUser.email = 'yes';
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(storedUser)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should be not be able to sign in before sign up ', (done) => {
      const newUser = { email: 'newperson@gmail.com', password: 'iAmthegame' };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('should not be able to sign in with the wrong password ', (done) => {
      const newUser = { email: 'didasmbalanya@gmail.com', password: 'iAmthegame' };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should be able to sign in with the correct password ', (done) => {
      const newUser = { email: 'didasmbalanya@gmail.com', password: 'obionekanobi' };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('should get a logged in users profile', () => {
    it('GET/ should get the logged in users profile', (done) => {
      chai.request(app)
        .get('/api/v1/me')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
