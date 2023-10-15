import { Response } from "express";
import Joi from "joi";

export const handleValidationResponse = (error: Joi.ValidationError, res: Response) => {
    return res.status(400).json({
        message: error.details
    })
}

export const handleErrorResponse = (error: any, res: Response) => {
    let message = 'Something went wrong';
    if (error?.message && process.env.ENV === 'dev') {
        message = error?.message;
    }
    return res.status(500).json({
        message
    })
}