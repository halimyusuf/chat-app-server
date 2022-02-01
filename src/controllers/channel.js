import createError from 'http-errors';
import _ from 'lodash';
import Member from '../models/member';
import Channel from '../models/channel';
import validateInput from '../utils/InputValidation';

export const createChannel = async (req, res, next) => {
  const err = validateInput(req, res);
  if (err !== null) return;
  const workspaceId = req.params.workspace;
  req.body = _.pick(req.body, 'name');
  req.body.workspace = workspaceId;
  const channel1 = await Channel.findOne({
    workspace: workspaceId,
    name: { $regex: `${req.body.name}`, $options: 'i' }
  });
  if (channel1 !== null) {
    return next(createError(400, `Channel \'${req.body.name}\' already exists`));
  }
  let channel = new Channel({ ...req.body, users: [req.user.id], createdBy: req.user.id });
  channel = await channel.save();
  return res.status(200).json({ data: { message: 'success', channel } });
};

export const fetchWorkspaceChannels = async (req, res, next) => {
  const workspaceId = req.params.workspace;
  const channels = await Channel.find({ workspace: workspaceId });
  return res.status(200).json({ data: { message: 'success', channels } });
};
