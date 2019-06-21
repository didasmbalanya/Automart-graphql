/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { token, storedUser } from './user.test';

chai.use(chaiHttp);
chai.should();

const newCar = {
  state: 'new',
  status: 'available',
  price: 150,
  manufacturer: 'Toyoa',
  model: '  Vitz',
  body_type: '  Car',
};

describe('/POST USER methods', () => {
  it('should be able to signup a new user to post a car with', (done) => {
    storedUser.email = 'didasdexter@yahoo.com';
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(storedUser)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

describe('/POST CAR methods', () => {
  it('should not be able to post a car if not authorized', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .send(newCar)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should not be able to post a car without a price', (done) => {
    newCar.price = '';
    chai.request(app)
      .post('/api/v1/car')
      .send(newCar)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should be able to post a car if authorized', (done) => {
    newCar.price = 2000;
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${token}`)
      .send(newCar)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should be able to post more than one car if authorized', (done) => {
    newCar.price = 3000;
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${token}`)
      .send(newCar)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should be able to get car by ID', (done) => {
    newCar.price = 2000;
    chai.request(app)
      .get('/api/v1/car/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should be able to get a list of available cars', (done) => {
    newCar.price = 2000;
    chai.request(app)
      .get('/api/v1/car?status=available')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should be able to get a list of available cars within a price range', (done) => {
    chai.request(app)
      .get('/api/v1/car?status=available&min_price=1000&max_price=2500')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should notbe able to change the sale price of the car without Authorization', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1?price=1000')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should notbe able to change the mark as sold without auth', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1?status=sold')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should be able to change price if authorized', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1?price=1000')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should be able to mark as sold if authorized', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1?status=sold')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should be able to delete car if you own it', (done) => {
    chai.request(app)
      .delete('/api/v1/car/1')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 405 for right path with wrong method request', (done) => {
    chai.request(app)
      .put('/api/v1/car')
      .send(storedUser)
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

export default newCar;
