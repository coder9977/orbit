declare module "koa-winston" {
  import type { Middleware } from "koa";
  import type { Logger } from "winston";

  export interface KoaWinstonOptions {
    winstonInstance?: Logger;
    [key: string]: unknown;
  }

  export function logger(options: KoaWinstonOptions): Middleware;
  export function errorLogger(options?: KoaWinstonOptions): Middleware;

  const koaWinston: {
    logger(options: KoaWinstonOptions): Middleware;
    errorLogger(options?: KoaWinstonOptions): Middleware;
  };

  export default koaWinston;
}
