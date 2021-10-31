import { Router } from 'express';
import asyncFn from '../utils/asyncFn';
import auth from '../middleware/auth';
import validator from '../validator/workspace';
import { createWorkspace, fetchWorkspaceUsers, fetchWorkspaces, joinWorkspace } from '../controllers/workspace';
const workspaceRouter = Router();

workspaceRouter.get('/', auth, asyncFn(fetchWorkspaces));
workspaceRouter.get('/:workspace/users', auth, asyncFn(fetchWorkspaceUsers));
workspaceRouter.post('/join/:workspace', auth, asyncFn(joinWorkspace));
workspaceRouter.post('/new', validator, auth, asyncFn(createWorkspace));

export default workspaceRouter;
