import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import mongoose from "mongoose";
import { createApolloServer } from "./graphql/server";
import { healthRouter } from "./api/health.js";

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.use(healthRouter.routes());
app.use(router.routes()).use(router.allowedMethods());

async function startServer() {
  const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/koa_backend";

  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected", MONGO_URI);

  const apolloServer = await createApolloServer();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const port = Number(process.env.BACKEND_PORT || 3138);
  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
  });
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
