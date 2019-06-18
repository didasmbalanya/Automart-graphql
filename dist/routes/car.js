"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../middleware/auth");

var _car = require("../controllers/car");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
// eslint-disable-next-line import/named
var router = _express["default"].Router();

router.get('/', function (req, res) {
  return res.send({
    message: 'Welcome to AUTOMARTS API'
  });
});
router.get('/api/v1/car', _car.getCars);
router.get('/api/v1/car/:id', _car.getCarById);
router.get('/api/v1/car?status=available&state=new');
router.get('/api/v1/car?status=available&state=used');
router.get('/api/v1/car?body_type=bodyType');
router.get('/api/v1/car?status=available&manufacturer=XXXValue');
router.post('/api/v1/car', _auth.auth, _car.postCar);
router.patch('/api/v1/car/:id', _auth.auth, _car.changeProperty);
router["delete"]('/api/v1/car/:id', _auth.auth, _car.deleteCar);
var _default = router;
exports["default"] = _default;