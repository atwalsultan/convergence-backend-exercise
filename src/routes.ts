// Third-party packages
import { Express, Request, Response } from 'express';

// Local packages
import { createUserHandler } from './controllers/userController';
import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from './controllers/sessionController';
import { validateRequest, requiresUser } from './middleware';
import { createUserSchema, createUserSessionSchema } from './schemas/userSchemas';

export default function(app: Express) {
  app.get("/test", (req: Request, res: Response) => res.sendStatus(200));
  

  // Signup
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);

  // Get sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler)

  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler)
}