import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import mongoose from "mongoose";
import koaWinston from "koa-winston";
import { createApolloServer } from "./graphql/server.ts";
import { healthRouter } from "./api/health.js";
import { DEFAULT_BACKEND_PORT, MONGO_URI } from "./config/config.ts";
import dotenv from "dotenv";
dotenv.config();

const app = new Koa();
const router = new Router();
  
app.use(cors());
app.use(bodyParser());

router.use(healthRouter.routes());
app.use(router.routes()).use(router.allowedMethods());

async function startServer() {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected", MONGO_URI);

  const apolloServer = await createApolloServer();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const port = Number(process.env.BACKEND_PORT || DEFAULT_BACKEND_PORT);
  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
  });
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
