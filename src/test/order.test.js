/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';
import newCar from './car.test';

chai.use(chaiHttp);
chai.should();

const thirdUser = {
  first_name: 'Lucy',
  last_name: 'Mbalanya',
  email: 'lucymbalanya@gmail.com',
  address: 'Nairobi',
  password: 'obionekanobi',
  confirm_password: 'obionekanobi',
};
const { SECRET } = process.env;
const token2 = jwt.sign({ email: thirdUser.email }, SECRET, {
  expiresIn: '3h',
});

describe('/ORDERS', () => {
  describe('user to make order', () => {
    it('should be able to signup a new user to make po', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(thirdUser)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it('new car to test post for other order test', done => {
      newCar.price = 5000;
      chai
        .request(app)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${token2}`)
        .send(newCar)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('Orders ', () => {
    it('should be unable make po if not auth', done => {
      chai
        .request(app)
        .post('/api/v1/order')
        .send({
          car_id: 5,
          price_offered: 3000,
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('should be able make po if auth', done => {
      chai
        .request(app)
        .post('/api/v1/order')
        .set('Authorization', `Bearer ${token2}`)
        .send({
          car_id: 2,
          price_offered: 3000,
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('should be able to buy own car', done => {
      chai
        .request(app)
        .post('/api/v1/order')
        .set('Authorization', `Bearer ${token2}`)
        .send({
          car_id: 3,
          price_offered: 3000,
        })
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });

    it('should be get a po by Id', done => {
      chai
        .request(app)
        .get('/api/v1/order/1')
        .set('Authorization', `Bearer ${token2}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should be get a po thats not the buyers', done => {
      chai
        .request(app)
        .get('/api/v1/order/5')
        .set('Authorization', `Bearer ${token2}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
