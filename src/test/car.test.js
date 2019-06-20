/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';
import { addNewUser } from '../models/user';

app.use(chaiHttp);
chai.should();
const { secret } = process.env;

const secondUser = {
  first_name: 'dexter',
  last_name: 'didas',
  email: 'didasopi@yahoo.com',
  address: 'Nairobi',
  password: 'obionekanobi',
  confirm_password: 'obionekanobi',
};

const newCar = {
  state: 'new',
  status: 'available',
  price: 210,
  manufacturer: 'Toyota',
  model: 'Vitz',
  body_type: 'saloon',
};

const token = jwt.sign({ email: secondUser.email }, secret, { expiresIn: '3h' });

describe('Cars', async () => {
  it('should be able to add new users who can post a car', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(secondUser)
      .end((err, res) => {
        res.should.have.status(201);
      });
    done();
  });
  it('should be able to post car if user is logged in', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${token}`)
      .send(newCar)
      .end((err, res) => {
        res.should.have.status(201);
      });
    done();
  });

  describe.skip('/GET car requests', () => {
    it('should all cars stored in our dataset', (done) => {
      chai.request(app)
        .get('/api/v1/car')
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });

    it('should return a car by its ID', (done) => {
      chai.request(app)
        .get('/api/v1/car/1')
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });

    it('should get all cars stored with status available', (done) => {
      chai.request(app)
        .get('/api/v1/car?status=available')
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });

    it('should get all cars between given price range', (done) => {
      chai.request(app)
        .get('/api/v1/car?status=available&&min_price=100&&max_price=150')
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
  });

  describe.skip('/POST Car requests', () => {
    it.skip('should not be able to post car if user is not logged in', (done) => {
      chai.request(app)
        .post('/api/v1/car')
        .send(newCar)
        .end((err, res) => {
          res.should.have.status(409);
        });
      done();
    });

    it('should be able to post car if user is logged in', async (done) => {
      await addNewUser(Object.values(storedUser));
      chai.request(app)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${token}`)
        .send(newCar)
        .end((err, res) => {
          res.should.have.status(201);
        });
      done();
    });
  });

  describe('/PATCH car requests', () => {
    it('should not be able to update car sale price if user is not logged in', (done) => {
      chai.request(app)
        .patch('/api/v1/car/1?price=10000')
        .end((err, res) => {
          res.should.have.status(401);
        });
      done();
    });

    it('should be able to update car sale price if user is logged in', (done) => {
      chai.request(app)
        .patch('/api/v1/car/1?price=10000')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });

    it('should not be able to mark as sold if user is not logged in', (done) => {
      chai.request(app)
        .patch('/api/v1/car/1?status=sold')
        .end((err, res) => {
          res.should.have.status(401);
        });
      done();
    });

    it('should be able to mark car as sold if user is logged in', (done) => {
      chai.request(app)
        .patch('/api/v1/car/1?status=sold')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
  });

  describe('/DELETE car requests', () => {
    it('should not be able to  delete car if user is not logged in or admin', (done) => {
      chai.request(app)
        .delete('/api/v1/car/1')
        .end((err, res) => {
          res.should.have.status(401);
        });
      done();
    });
  });
});
