const DEFAULT_MONGODB_URI = process.env.DEFAULT_MONGODB_URI || "mongodb://127.0.0.1:27017/koa_backend";
export const MONGO_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;
export const DEFAULT_BACKEND_PORT = Number(process.env.DEFAULT_BACKEND_PORT) || 3137;