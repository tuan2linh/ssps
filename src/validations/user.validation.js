import Joi from 'joi';
import { password, objectId } from './custom.validation.js';

export const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: password.required(),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user'),
    studentID: Joi.string().required(),
    department: Joi.string().required()
  })
};

export const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

export const getUser = {
  params: Joi.object().keys({
    userId: objectId.required()
  })
};

export const updateUser = {
  params: Joi.object().keys({
    userId: objectId.required()
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: password.required(),
      name: Joi.string(),
      studentID: Joi.string(),
      department: Joi.string()
    })
    .min(1)
};

export const deleteUser = {
  params: Joi.object().keys({
    userId: objectId.required()
  })
};
export const createOfficer = {
  body: Joi.object().keys({
    officerID: Joi.string().required(),
    campus: Joi.string().required(),
    CCCD: Joi.string().required(),
    email: Joi.string().required().email(),
    password: password.required(),
    name: Joi.string().required()
  })
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createOfficer
};
