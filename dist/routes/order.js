"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _order = require("../controllers/order");

var _auth = require("../middleware/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var router = _express["default"].Router();

router.post('/api/v1/order', _auth.auth, _order.postOrder);
router.patch('/api/v1/order/:id', _auth.auth, _order.updateOrder);
router.get('/api/v1/order/:id', _auth.auth, _order.getOrderById);
var _default = router;
exports["default"] = _default;