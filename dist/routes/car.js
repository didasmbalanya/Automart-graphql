"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _car = require("../controllers/car");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
// eslint-disable-next-line import/named
// import { auth } from '../middlewear/auth';
// const auth = require('../middlewear/auth');
var router = _express["default"].Router();

router.get('/api/v1/car', _car.getCars);
router.get('/api/v1/car/:id/', _car.getCarById);
router.get('/api/v1/car?status=available');
router.get('/api/v1/car?status=available&min_price=XXXValue&max_price=XXXValue');
router.get('/api/v1/car?status=available&state=new');
router.get('/api/v1/car?status=available&state=used');
router.get('/api/v1/car?body_type=bodyType');
router.get('/api/v1/car?status=available&manufacturer=XXXValue');
router.post('/api/v1/car', _car.postCar);
router.patch('/api/v1/car/:id', _car.changeProperty);
router["delete"]('/api/v1/car/:id', _car.deleteCar);
var _default = router;
exports["default"] = _default;