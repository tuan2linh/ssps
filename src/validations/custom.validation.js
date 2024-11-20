import Joi from 'joi';

//regex
const MONGO_OBJID_REGEX = /^[0-9a-fA-F]{24}$/;
const HAS_DIGIT_REGEX = /\d/;
const HAS_LETTER_REGEX = /[a-zA-Z]/;

//
export const objectId = Joi.string()
  .regex(MONGO_OBJID_REGEX)
  .message('"{{#label}}" must be a valid mongo id');

export const password = Joi.string()
  .min(8)
  .pattern(HAS_DIGIT_REGEX)
  .message('Password must contain at least 1 digit')
  .pattern(HAS_LETTER_REGEX)
  .message('Password must contain at least 1 letter');
