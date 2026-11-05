import * as jose from "jose";
import { JWT_ALGORITHM } from "../config/config.ts";
import { authMiddlewareConfig } from "../config/config.ts";

// The secret key must be converted to a Uint8Array (at least 32 bytes for HS256)
const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET || "");

// 1. Generate a JWT
export async function generateToken(payload: Record<string, any>) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }
  const expirationTime = new Date(Date.now() + authMiddlewareConfig.jwtExpiry * 1000);
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(jwtSecret);

  return jwt;
}

export async function verifyToken(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }
  try {
    const { payload } = await jose.jwtVerify(token, jwtSecret);
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token: " + (error as Error).message);
  }
}
