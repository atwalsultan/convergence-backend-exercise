// Third-party packages
import { Express } from 'express';

// Local packages
import { createUserHandler } from './controllers/userController';
import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from './controllers/sessionController';
import { validateRequest, requiresUser } from './middleware';
import { createUserSchema } from './schemas/userSchema';
import { createSessionSchema } from './schemas/sessionSchema';
import { createTaskHandler, deleteTaskHandler, getFilteredTasksHandler, getTaskHandler, getTasksHandler, updateTaskHandler } from './controllers/taskController';
import { createTaskSchema, updateTaskSchema, deleteTaskSchema } from './schemas/taskSchema';

export default function(app: Express) {  
  // Signup
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post("/api/sessions", validateRequest(createSessionSchema), createUserSessionHandler);

  // Get sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // Create a task
  app.post("/api/tasks", [requiresUser, validateRequest(createTaskSchema)], createTaskHandler);

  // Update a task
  app.put("/api/tasks/:taskId", [requiresUser, validateRequest(updateTaskSchema)], updateTaskHandler);

  // Get a single task
  app.get("/api/tasks/:taskId", getTaskHandler);

  // Get all tasks
  app.get("/api/tasks", getTasksHandler);

  // Get filtered tasks
  app.get("/api/tasks/filter/:filter", getFilteredTasksHandler)

  // Delete a single task
  app.delete("/api/tasks/:taskId", [requiresUser, validateRequest(deleteTaskSchema)], deleteTaskHandler);
}