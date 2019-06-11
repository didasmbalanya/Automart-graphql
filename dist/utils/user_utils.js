"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getPublicProfile = void 0;

/* eslint-disable linebreak-style */
var getPublicProfile = function getPublicProfile(userObject) {
  var publicUser = {
    id: userObject.id,
    first_name: userObject.first_name,
    last_name: userObject.last_name,
    email: userObject.email
  };
  return publicUser;
};

exports.getPublicProfile = getPublicProfile;
var _default = getPublicProfile;
exports["default"] = _default;