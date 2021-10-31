import jwt from 'jsonwebtoken';
import User from '../models/user';
import createError from 'http-errors';
import { headerTokenKey, jwtSecret } from '../config';

export default async function (req, res, next) {
  let header = req.headers[headerTokenKey];
  if (!header) return next(createError(403, 'Invalid token'));
  header = header.split(' ');
  if (header.length < 2) return next(createError(403, 'Invalid token'));
  const token = header[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Expired Token' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}
