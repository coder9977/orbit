import { readFileSync } from "node:fs";
import path from "node:path";
import { createServer } from "node:https";import "dotenv/config";
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import mongoose from "mongoose";
import koaWinston from "koa-winston";
import { createApolloServer } from "./graphql/server.ts";
import { routes } from "./routes/index.ts";
import { DEFAULT_BACKEND_PORT, MONGO_URI } from "./config/config.ts";
import { middlewares } from "./middleware/middlewares.ts";
import { registerMiddlewares } from "./utils/middleware.utils.ts";
import { registerRoutes } from "./utils/routes.utils.ts";

const app = new Koa();
const router = new Router({ prefix: "/api" });
registerMiddlewares(app, middlewares)

app.use(cors({
  origin: (ctx) =>{
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
    const formattedAllowedOrigins = allowedOrigins.map((origin) => origin.trim().replace(/\/$/, ""));
    const requestOrigin = ctx.get('origin');
    return formattedAllowedOrigins.includes(requestOrigin) ? requestOrigin : "*"
  }
}));
app.use(bodyParser());

registerRoutes(router, routes);
app.use(router.routes()).use(router.allowedMethods());

async function startServer() {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected", MONGO_URI);

  const apolloServer = await createApolloServer();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const port = Number(process.env.BACKEND_PORT || DEFAULT_BACKEND_PORT);

  createServer({
    key: readFileSync(path.resolve("../localhost+3-key.pem")),
    cert: readFileSync(path.resolve("../localhost+3.pem")),
  }, app.callback()).listen(port, () => {
    console.log(`Backend listening on https://localhost:${port}`);
    console.log(`GraphQL endpoint: https://localhost:${port}/graphql`);
  });
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
