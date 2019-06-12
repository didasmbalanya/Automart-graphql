/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { token } from './user.test';

app.use(chaiHttp);
chai.should();

const newCar = {
  state: 'new',
  status: 'available',
  price: '210',
  manufacturer: 'Toyota',
  model: 'Vitz',
  body_type: 'saloon',
};

describe('Cars', () => {
  describe('/GET car requests', () => {
    it('should all cars stored in our dataset', (done) => {
      chai.request(app)
        .get('/api/v1/car')
        .end((err, res) => {
          if (err) err.should.have.status(404);
          else {
            res.should.have.status(200);
            res.body.should.be.an('array');
          }
          done();
        });
    });

    it('should return a car by its ID', (done) => {
      chai.request(app)
        .get('/api/v1/car/1')
        .end((err, res) => {
          if (err) err.should.have.status(404);
          else {
            res.should.have.status(200);
            res.should.be.an('object');
          }
          done();
        });
    });
  });

  describe('/POST Car requests', () => {
    it('should not be able to post car if user is not logged in', (done) => {
      chai.request(app)
        .post('/api/v1/car')
        .send(newCar)
        .end((err, res) => {
          if (err) err.should.have.status(404);
          else res.should.have.status(401);
          done();
        });
    });

    it('should be able to post car if user is logged in', (done) => {
      chai.request(app)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${token}`)
        .send(newCar)
        .end((err, res) => {
          if (err) err.should.have.status(404);
          else res.should.have.status(201);
          done();
        });
    });
  });

  describe('/PATCH car requests', () => {
    it('should not be able to update car sale price if user is not logged in', (done) => {
      chai.request(app)
        .patch('/api/v1/car/1?price=10000')
        .end((err, res) => {
          if (err) err.should.have.status(404);
          else res.should.have.status(401);
          done();
        });
    });

    it('should be able to update car sale price if user is logged in', (done) => {
      chai.request(app)
        .patch('/api/v1/car/1?price=10000')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) err.should.have.status(404);
          else res.should.have.status(204);
          done();
        });
    });

    it('should not be able to mark as sold if user is not logged in', (done) => {
      chai.request(app)
        .patch('/api/v1/car/1?status=sold')
        .end((err, res) => {
          if (err) err.should.have.status(404);
          else res.should.have.status(401);
          done();
        });
    });

    it('should be able to mark car as sold if user is logged in', (done) => {
      chai.request(app)
        .patch('/api/v1/car/1?status=sold')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) err.should.have.status(404);
          else res.should.have.status(204);
          done();
        });
    });
  });

  describe('/DELETE car requests', () => {
    it('should not be able to  delete car if user is not logged in or admin', (done) => {
      chai.request(app)
        .delete('/api/v1/car/1')
        .end((err, res) => {
          if (err) err.should.have.status(404);
          else res.should.have.status(401);
          done();
        });
    });

    // admin can delete cars
  });
});
