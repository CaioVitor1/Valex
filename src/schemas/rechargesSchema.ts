import joi from 'joi';

const newRechargesSchema = joi.object({
  cardId: joi.number().required(),
  amount: joi.number().positive().required()
});

export default newRechargesSchema;