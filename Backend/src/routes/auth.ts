import Router from "koa-router";
import moment from "moment";
import type { Context } from "koa";
import { UserModel } from "../models/user.ts";
import { type RESPONSE } from "../types/types.ts";
import { ERR_CODES, REQUEST_STATUS } from "../constants/constants.ts";
import { verifyToken, generateToken } from "../utils/jwt.utils.ts";
import { LoginModel } from "../models/login.ts";
import mongoose from "mongoose";

export type UserInfo = {
  name?: string;
  password?: string;  
  email?: string;
  login_id?: string;
  lastLoginAt?: Date;
  permissions?: string[];
  createdAt?: Date;
};

type LoginInfo = {
  user_id: string;
  credentials: string;
};

const router = new Router();
router.post("/login", async (ctx: Context): Promise<RESPONSE> => {
  try {
    if (ctx.state?.middlewareError?.message) {
      ctx.status = 403;
      return (ctx.body = {
        status: REQUEST_STATUS.FORBIDDEN,
        code: ERR_CODES.FORBIDDEN,
        msg: ctx.state.middlewareError.message,
      });
    }
    const { name, login_id, password } = ctx.request.body as UserInfo;
    const user = await UserModel.findOne({ name });
    if (!user) {
      return (ctx.body = {
        status: REQUEST_STATUS.FORBIDDEN,
        code: ERR_CODES.LOGIN_FAILED,
        msg: "User doesn't exist.",
      });
    }
    const loginCredentials = await LoginModel.findOne({ user_id: user._id });
    const credentials = await verifyToken(loginCredentials?.credentials ?? "");
    if (!credentials || credentials.login_id !== login_id || credentials.password !== password) {
      return (ctx.body = {
        status: REQUEST_STATUS.FORBIDDEN,
        code: ERR_CODES.LOGIN_FAILED,
        msg: "login failed with provided credentials",
      });
    }
    const loginID = new mongoose.Types.ObjectId();
    await LoginModel.findOneAndUpdate(
      { user_id: user._id },
      { $set: { lastLoginAt: new Date(), login_id: loginID } },
      { new: true },
    ).exec();
    return (ctx.body = {
      data: {
        token: await generateToken({ name, login_id: loginID.toString() }),
        user,
      },
      status: REQUEST_STATUS.OK,
    });
  } catch (error) {
    console.log("Login Error: ", error);
    return (ctx.body = error as RESPONSE);
  }
});

router.get("/auth", async (ctx: Context): Promise<RESPONSE> => {
  if (ctx.state?.middlewareError) {
    const { status, msg } = ctx.state.middlewareError;
    ctx.status = status;
    return (ctx.body = {
      status: REQUEST_STATUS.FORBIDDEN,
      code: ERR_CODES.FORBIDDEN,
      msg,
    });
  }
  ctx.status = REQUEST_STATUS.OK;
  return (ctx.body = {
    data: ctx.user,
    status: REQUEST_STATUS.OK,
  });
});

export { router as authRouter };
