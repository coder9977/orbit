import Router from "koa-router";
export const registerRoutes = (router: Router, routes: Router.IMiddleware[]) => {
  routes.forEach((route) => {
    router.use(route);
  })};
