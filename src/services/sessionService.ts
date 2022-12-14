// Third-party packages
import { get } from "lodash";
import { LeanDocument, FilterQuery, UpdateQuery, FlattenMaps } from "mongoose";

// Local packages
import config from "config";
import { sign, decode } from "../utils/jwtUtils";
import Session, { SessionDocument } from "../models/sessionModel";
import { findUser } from "./userService";

// Create session
export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

// Create access token
export function createAccessToken({
  user,
  session,
}: {
  user: false | Pick<FlattenMaps<LeanDocument<any>>, string | number | symbol>
  session: FlattenMaps<LeanDocument<any>>
}) {
  // Build and return the new access token
  const accessToken = sign({ ...user, session: session._id }, { expiresIn: config.get("accessTokenTtl") });

  return accessToken;
}

// Re-issue access token
export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) return false;

  // Get the session
  const session = await Session.findById(get(decoded, "_id"));

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}

// Update session
export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}

// Find user sessions
export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}
