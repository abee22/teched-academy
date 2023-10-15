import Joi from 'joi';

export const issueCertificateSchema = Joi.object({
    studentId: Joi.string()
        .required(),
    courseId: Joi.string()
        .required(),
});

export const verifyCertificateSchema = Joi.object({
    certificateData: Joi.object().required()
});