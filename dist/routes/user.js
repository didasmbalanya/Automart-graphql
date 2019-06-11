"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("../controllers/user");

var _auth = require("../middleware/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var router = _express["default"].Router();

router.get('/api/v1/auth/users/me', _auth.auth, _user.getMe);
router.post('/api/v1/auth/signup', _user.signup);
router.post('/api/v1/auth/signin', _user.signin);
var _default = router;
exports["default"] = _default;