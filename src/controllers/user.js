/* eslint-disable linebreak-style */
import users from '../models/user';

export const signup = (req, res) => {
  users.push(req.body);
  res.status(200).send(users);
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  const foundUser = users.find(user => user.email === email);
  if (foundUser.password === password) {
    res.status(200).send(foundUser);
  } else {
    res.status(404).send('nothing');
  }
};
