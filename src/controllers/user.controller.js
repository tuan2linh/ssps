import mongoose from 'mongoose';
import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { userService } from '../services/index.js';

export const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

export const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

export const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

export const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

export const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.send({ message: 'User deleted successfully' });
});

export const createOfficer = catchAsync(async (req, res) => {
  try {
    const specificId = new mongoose.Types.ObjectId('67360ef8766a754331f656fd');
    console.log(req.user._id);
    console.log(specificId);
    if (!req.user._id.equals(specificId)) {
      res.status(httpStatus.UNAUTHORIZED).send('You are not authorized to create an officer');
    }
    const officer = await userService.createOfficer(req.body);
    res.status(httpStatus.CREATED).send(officer);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createOfficer
};
