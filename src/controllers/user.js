import bcrypt from 'bcrypt';
import _ from 'lodash';
import createError from 'http-errors';
import User from '../models/user';
import inputValidator from '../utils/InputValidation';

export const createUser = async (req, res, next) => {
  const err = inputValidator(req, res);
  if (err !== null) return;
  req.body = _.pick(req.body, 'email', 'password', 'firstname', 'lastname');
  req.body.password = await bcrypt.hash(req.body.password, 10);
  req.body.email = req.body.email.toLowerCase();
  let user = await User.findOne({ email: req.body.email });
  if (user !== null) {
    return next(createError(400, 'An account with this email already exists'));
  }
  user = new User(req.body);
  const newUser = await user.save();
  const token = newUser.generateAuthToken();
  return res.status(200).json({ data: { message: 'success', token } });
};

export const login = async (req, res, next) => {
  let { password, email } = req.body;
  if (!email) return next(createError(442, 'Invalid login credentials.'));
  if (!password) return next(createError(442, 'Invalid login credentials.'));
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (user === null) {
    return next(createError(400, 'Invalid login credentials.'));
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next(createError(400, 'Invalid login credentials.'));
  }
  const token = user.generateAuthToken();
  await user.save();
  return res.send({
    data: { token }
  });
};
