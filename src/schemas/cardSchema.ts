import joi from 'joi';

export const newCardSchema = joi.object({
  employeeId: joi.number().required(),
  type: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
});
 
export const ativateSchema = joi.object({
  cardId: joi.number().required(),
  decryptedCvc: joi.string().required(),
  password: joi.string().length(4).pattern(/^[0-9]+$/).required()
});

