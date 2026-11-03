import  Koa, {
    DefaultState as KoaDefaultState, 
    DefaultContext as KoaDefaultContext, 
    Middleware as KOAMiddleware,
}  from "koa";
export const registerMiddlewares = (app: Koa<KoaDefaultState, KoaDefaultContext>, middlewares: KOAMiddleware[]) => {
  middlewares.forEach((mw) => app.use(mw));
}