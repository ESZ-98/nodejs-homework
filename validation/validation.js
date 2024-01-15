import Joi from 'joi';

const schemaPost = Joi.object({
  name: Joi.string().min(2).trim().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).trim().required(),
  phone: Joi.string().trim().required(),
});

const schemaPut = Joi.object({
  name: Joi.string().min(2).trim(),
  email: Joi.string().email({ minDomainSegments: 2 }).trim(),
  phone: Joi.string().trim(),
}).min(1);

export { schemaPost, schemaPut };
