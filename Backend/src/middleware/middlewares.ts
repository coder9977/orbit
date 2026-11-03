import type { Context, Next } from "koa";
import {
  authMiddlewareConfig,
  JWT_VALIDITY_PERIOD,
  JWT_VALIDITY_UNIT,
} from "../config/config.ts";
import { ERR_CODES, REQUEST_STATUS } from "../constants/constants.ts";
import { type UserInfo } from "../routes/auth.ts";
import { verifyToken } from "../utils/jwt.utils.ts";
import { UserModel } from "../models/user.ts";
import { LoginModel } from "../models/login.ts";
import moment from "moment";

export type MiddlewareError = {
  status: REQUEST_STATUS;
  code: ERR_CODES;
  msg: string;
};

const errorHandlingMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    console.error("Error occurred:", err);
    ctx.status = (err as MiddlewareError).status || 500;
    ctx.body = err;
  }
};

const authMiddleware = async (ctx: Context, next: Next) => {
  if (authMiddlewareConfig.whitelist.includes(ctx.path)) {
    return next();
  }
  if (ctx.method === "OPTIONS") {
    return next();
  }
  console.log(`Test middleware executed: ${ctx.method} ${ctx.path}`);
  try {
    const { authorization } = ctx.request.header;
    const token = authorization?.split(" ")[1];
    if (!token) {
      ctx.status = REQUEST_STATUS.FORBIDDEN;
      ctx.state.middlewareError = {
        status: REQUEST_STATUS.FORBIDDEN,
        code: ERR_CODES.LOGIN_FAILED,
        msg: "login failed without credentials being provided.",
      };
      return next();
    }
    const auth = (await verifyToken(token as string)) as UserInfo;
    if (!auth.name || !auth.login_id) {
      ctx.state.middlewareError = {
        status: REQUEST_STATUS.FORBIDDEN,
        code: ERR_CODES.LOGIN_FAILED,
        msg: "Authentication failed with invalid credentials.",
      };
      ctx.status = REQUEST_STATUS.FORBIDDEN;
      return next();
    }

    const user = await UserModel.findOne({ name: auth.name });
    if (!user) {
      ctx.state.middlewareError = {
        status: REQUEST_STATUS.FORBIDDEN,
        code: ERR_CODES.LOGIN_FAILED,
        msg: "User doesn't exist.",
      };
      ctx.status = REQUEST_STATUS.FORBIDDEN;
      return next();
    }
    ctx.user = user;

    const loginInfo = await LoginModel.findOne({
      user_id: user._id,
      login_id: auth.login_id,
    }).exec();

    if (!loginInfo) {
      ctx.state.middlewareError = {
        status: REQUEST_STATUS.FORBIDDEN,
        code: ERR_CODES.LOGIN_FAILED,
        msg: "Authentication failed with provided credentials",
      };
      ctx.status = REQUEST_STATUS.FORBIDDEN;
      return next();
    }
    const timeElapsed = moment().diff(
      moment(loginInfo?.lastLoginAt as Date),
      JWT_VALIDITY_UNIT,
    );
    if (timeElapsed >= parseInt(JWT_VALIDITY_PERIOD as string)) {
      ctx.state.middlewareError = {
        status: REQUEST_STATUS.FORBIDDEN,
        code: ERR_CODES.LOGIN_EXPIRED,
        msg: "Authentication failed with expired credentials",
      };
      ctx.status = REQUEST_STATUS.FORBIDDEN;
      return next();
    }
    await next();
  } catch (error) {
    ctx.state.middlewareError = error;
  }
};

export const middlewares = [authMiddleware];
