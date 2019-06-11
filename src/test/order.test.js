/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Orders', () => {
  describe('GET order api', () => {
    it('should get a specific users po', (done) => {
      chai.request(app)
        .get('/api/v1/order/1')
        .end((err, res) => {
          if (err) res.should.have.status(404);
          else if (res.error) res.should.have.status(401);
          else {
            res.should.have.status(200);
            res.body.should.be.an('object');
          }
          done();
        });
    });
  });
});
