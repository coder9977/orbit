const DEFAULT_MONGODB_URI = process.env.DEFAULT_MONGODB_URI || "mongodb://127.0.0.1:27017/koa_backend";
export const MONGO_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;
export const DEFAULT_BACKEND_PORT = Number(process.env.DEFAULT_BACKEND_PORT) || 3137;
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM || "HS256";
export const JWT_VALIDITY_UNIT = "days"; // days, minutes, hours, etc.
export const JWT_VALIDITY_PERIOD = process.env.JWT_VALIDITY_PERIOD || 1; // Default to 1440 minutes (24 hours)
export const authMiddlewareConfig = {
  whitelist: ["/login", "/register",],
  jwtExpiry: 60 // 60 seconds
};
