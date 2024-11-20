import Joi from 'joi';
import { password } from './custom.validation.js';

export const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: password.required(),
    studentID: Joi.string().required(),
    department: Joi.string().required()
  })
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

export const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

export const sendVerificationEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email()
  })
};

export const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required()
  })
};

export const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email()
  })
};

export const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required()
  }),
  body: Joi.object().keys({
    password: password.required()
  })
};

export const changePassword = {
  body: Joi.object().keys({
    currentPassword: password.required(),
    newPassword: password.required()
  })
};

export default {
  register,
  login,
  logout,
  refreshTokens,
  sendVerificationEmail,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword
};
