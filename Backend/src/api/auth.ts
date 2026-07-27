import Router from "koa-router";
import type { Context } from "koa";
import { UserModel } from "../models/user.ts";
import { type RESPONSE } from "../types/types.ts";
import { ERR_CODES, REQUEST_STATUS } from "../constants/constants.ts";


type UserInfo = {
  name?: string;
  email?: string;
  lastLoginAt?: Date;
  permissions?: string[];
  createdAt?: Date;
};

const router = new Router();
router.post("/login", async (ctx: Context): Promise<RESPONSE> => {
  const { name, email } = ctx.request.body as UserInfo;
  const user = await UserModel.findOneAndUpdate(
    { name, email },
    { lastLoginAt: new Date() },
    { new: true },
  );
  if (!user) {
    return ctx.body = {
      status: REQUEST_STATUS.REJECTED,
      code: ERR_CODES.LOGIN_EXPIRED,
      msg: "login expired",
    }
  }
  return ctx.body = {
    data: user,
    status: REQUEST_STATUS.OK
  }
});

export { router as authRouter };
