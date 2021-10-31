import { check } from 'express-validator';

export default [
  check('email').isEmail().withMessage('Enter a valid email'),
  check('password').isLength({ min: 5 }).withMessage('Must be at least 5 chars long'),
  check(['lastname', 'firstname'])
    .trim()
    .isLength({
      min: 2
    })
    .withMessage('Length must be at least 2 chars long')
    .isLength({
      max: 20
    })
    .withMessage('Max length allowed is 20 chars')
];
