// Third-party packages
import { get } from "lodash";
import { Request, Response } from "express";

// Local packages
import config from 'config';
import { sign } from "../utils/jwtUtils";
import { validatePassword } from "../services/userService";
import { createAccessToken, createSession, updateSession, findSessions } from "../services/sessionService";

// Create user session
export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate email and password
  const user = await validatePassword(req.body);

  if (!user) return res.status(401).send("Invalid username or password");

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // Create access token
  const accessToken = createAccessToken({
    user,
    session,
  });

  // Create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get("refreshTokenTtl"),
  });

  // Send refresh & access tokens back
  return res.send({ accessToken, refreshToken });
} 

// Invalidate user session
export async function invalidateUserSessionHandler(
  req: Request,
  res: Response
) {
  const sessionId = get(req, "user.session");
  await updateSession({ _id: sessionId }, { valid: false });

  return res.sendStatus(200);
}

// Get user sessions
export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}
