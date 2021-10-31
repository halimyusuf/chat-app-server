import { check } from 'express-validator';

export default [
  check(['name'])
    .trim()
    .isLength({
      min: 2
    })
    .withMessage('Length must be at least 3 chars long')
    .isLength({
      max: 30
    })
    .withMessage('Max length allowed is 30 chars')
];
