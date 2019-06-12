import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

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
  });

  describe('POST order requests', () => {
    it('should not a get order if not authenticated', (done) => {
      chai.request(app)
        .post('/api/v1/order')
        .send(
          {
          price: 2000,
          price_offered:3000
          }
        )
        .end((err, res) => {
          if (err) res.should.have.status(404);
          else res.should.have.status(401);
          done();
        })
    })
  })
});
