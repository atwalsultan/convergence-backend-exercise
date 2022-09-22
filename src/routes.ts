// Third-party packages
import { Express, Request, Response } from 'express';

// Local packages
import { createUserHandler } from './controllers/userController';
import validateRequest from './middleware/validateRequest';
import { createUserSchema } from './schemas/userSchemas';

export default function(app: Express) {
  app.get("/test", (req: Request, res: Response) => res.sendStatus(200));
  

  // Signup
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login

  // Get the user's sessions

  // Logout
}