/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { token } from './user.test';

chai.use(chaiHttp);
chai.should();

describe('Orders', () => {
  describe('GET order requests', () => {
    it('should not a get order if not authenticated', (done) => {
      chai.request(app)
        .get('/api/v1/order/1')
        .end((err, res) => {
          if (err) res.should.have.status(404);
          else res.should.have.status(401);
          done();
        });
    });

    it('should get order if authenticated', (done) => {
      chai.request(app)
        .get('/api/v1/order/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) res.should.have.status(404);
          else res.should.have.status(200);
          done();
        });
    });
  });

  describe('POST order requests', () => {
    it('should not be able to post order if not authenticated', (done) => {
      chai.request(app)
        .post('/api/v1/order')
        .send(
          {
            price: 2000,
            price_offered: 3000,
          },
        )
        .end((err, res) => {
          if (err) res.should.have.status(404);
          else res.should.have.status(401);
          done();
        });
    });

    it('should be able to post order if authenticated', (done) => {
      chai.request(app)
        .post('/api/v1/order')
        .set('Authorization', `Bearer ${token}`)
        .send(
          {
            price_offered: 3000,
          },
        )
        .end((err, res) => {
          if (err) res.should.have.status(404);
          else res.should.have.status(201);
          done();
        });
    });
  });

  describe('PATCH orders requests', () => {
    it('should be able to update price for a logged in user', (done) => {
      chai.request(app)
        .patch('/api/v1/order/1?price=20000')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) res.should.have.status(404);
          else res.should.have.status(204);
          done();
        });
    });
  });
});
