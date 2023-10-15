import Joi from 'joi';

export const studentSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    courseId: Joi.string()
        .required(),
    email: Joi.string()
        .email()
});