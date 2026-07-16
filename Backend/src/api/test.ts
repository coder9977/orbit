import Router from "koa-router";

const router = new Router();
router.get("/test", (ctx: any) => {
  ctx.body = { status: "ok" };
});

export { router as testRouter };
