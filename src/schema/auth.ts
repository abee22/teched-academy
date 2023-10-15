import Joi from 'joi';

export const studentAuthSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
});