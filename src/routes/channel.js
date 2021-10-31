import { Router } from 'express';
import asyncFn from '../utils/asyncFn';
import auth from '../middleware/auth';
import validator from '../validator/channel';
import { createchannel, fetchWorkspaceChannels } from '../controllers/channel';
const channelRouter = Router();

channelRouter.get('/:workspace', auth, asyncFn(fetchWorkspaceChannels));
channelRouter.post('/new', validator, auth, asyncFn(createchannel));

export default channelRouter;
