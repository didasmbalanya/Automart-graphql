/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';

chai.use(chaiHttp);
chai.should();

const storedUser = {
  first_name: 'didas',
  last_name: 'Mbalanya',
  email: 'didasmbalanya5@gmail.com',
  address: 'Nairobi',
  password: 'obionekanobi',
  confirm_password: 'obionekanobi',
};
// const { secret } = process.env;
// const token = jwt.sign({ email: storedUser.email }, secret, { expiresIn: '3h' });

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
    it('should be able to signup', (done) => {
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
  });
});
