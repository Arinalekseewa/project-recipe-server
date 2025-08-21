import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().max(16).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.max": "Name should have at most 16 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().max(128).required().messages({
    "string.base": "Email should be a string",
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email",
    "string.max": "Email should have at most 128 characters",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).max(128).required().messages({
    "string.base": "Password should be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have at least 8 characters",
    "string.max": "Password should have at most 128 characters",
    "any.required": "Password is required",
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});