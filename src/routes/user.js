import { Router } from 'express';
import userValidator from '../validator/user';
import { login, createUser } from '../controllers/user';
import asyncFn from '../utils/asyncFn';
const userRouter = Router();

userRouter.post('/login', asyncFn(login));
userRouter.post('/new', userValidator, asyncFn(createUser));

export default userRouter;
