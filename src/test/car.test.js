/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

app.use(chaiHttp);
chai.should();

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
});
