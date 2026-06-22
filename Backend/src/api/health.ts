import Router from "koa-router";

const router = new Router();
router.get("/health", (ctx: any) => {
  ctx.body = { status: "ok" };
});

export { router as healthRouter };
