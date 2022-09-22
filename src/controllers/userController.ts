// Third party packages
import { Request, Response } from "express";
import { omit } from "lodash";

// Local packages
import { createUser } from "../services/userService";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    console.log(e);
    return res.status(409).send("Could not create user. Please try again");
  }
}