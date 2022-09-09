import * as Joi from 'joi';

export const applicationConfigValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  PORT: Joi.number().default(3000),
  PREFIX: Joi.string().default('api'),
});
