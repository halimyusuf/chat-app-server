import { Router } from 'express';
import asyncFn from '../utils/asyncFn';
import auth from '../middleware/auth';
import validator from '../validator/channel';
import { createChannel, fetchWorkspaceChannels } from '../controllers/channel';
const channelRouter = Router();

channelRouter.get('/:workspace', auth, asyncFn(fetchWorkspaceChannels));
channelRouter.post('/:workspace/new', validator, auth, asyncFn(createChannel));

export default channelRouter;
