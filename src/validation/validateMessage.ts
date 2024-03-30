import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const messagesSchema = Joi.object({
  messages: Joi.array().items(
    Joi.object({
      phoneNumber: Joi.string().required().max(15),
      recipientName: Joi.string().required().max(50),
      text: Joi.string().required().max(1000),
    })
  ),
});

export const validateMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await messagesSchema.validateAsync(req.body);
    return next();
  } catch (err) {
    return res.status(400).send(err);
  }
};
