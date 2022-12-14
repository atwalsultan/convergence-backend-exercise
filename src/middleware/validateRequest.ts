// Third-party packages
import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const validate = (schema: AnySchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (e) {
    console.log(e);
    return res.status(400).send("Could not validate request.");
  }
};

export default validate;