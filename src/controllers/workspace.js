import createError from 'http-errors';
import _ from 'lodash';
import Member from '../models/member';
import Workspace from '../models/workspace';
import validateInput from '../utils/InputValidation';
import { checkIfMongoID } from '../utils/utils';

export const fetchWorkspaceUsers = async (req, res, next) => {
  const workspaceId = req.params.workspace;
  const users = await Member.find({ workspace: workspaceId }).populate('user', '-password');
  return res.status(200).json({ data: { message: 'success', users } });
};

export const fetchWorkspaces = async (req, res, next) => {
  const workspaces = await Member.find({ user: req.user.id }).populate('workspace');
  return res.status(200).json({ data: { message: 'success', workspaces } });
};

export const createWorkspace = async (req, res, next) => {
  const err = validateInput(req, res);
  if (err !== null) return;
  req.body = _.pick(req.body, 'name', 'description');
  req.body.createdBy = req.user.id;
  const workspace1 = await Workspace.findOne({
    createdBy: req.user.id,
    name: { $regex: `${req.body.name}`, $options: 'i' }
  });
  if (workspace1 !== null) {
    return next(createError(400, `Workspace \'${req.body.name}\' already exists`));
  }
  let workspace = new Workspace(req.body);
  workspace = await workspace.save();
  let member = await addNewMember(workspace._id, req.user.id);
  return res.status(200).json({ data: { message: 'success', workspace, member } });
};

export const joinWorkspace = async (req, res, next) => {
  const workspaceId = req.params.workspace;
  const member = await addNewMember(workspaceId, req.user.id);
  return res.status(200).json({ data: { message: 'success', member } });
};

async function addNewMember(workspaceId, userId) {
  return new Promise(async (resolve, reject) => {
    if (!checkIfMongoID(workspaceId)) {
      return reject(createError(400, 'Invalid workspace.'));
    } else if (!checkIfMongoID(workspaceId)) {
      return reject(createError(400, 'Invalid user.'));
    }
    let member = await Member.findOne({ workspace: workspaceId, user: userId });
    if (member !== null) {
      return reject(createError(400, 'User already joined workspace'));
    }
    try {
      member = new Member({ user: userId, workspace: workspaceId });
      member = await member.save();
      member = await Member.populate(member, { path: 'workspace' });
      resolve(member);
    } catch (error) {
      reject(error);
    }
  });
}
