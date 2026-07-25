import Router from "koa-router";
import moment from "moment";
import type { Context } from "koa";
import { UserModel } from "../models/user.ts";

type LoginResponse = {
  status: "ok" | "expired" | "invalid";
  user?: UserInfo
};

type UserInfo = {
  name?: string;
  email?: string;
  lastLoginAt?: Date;
  permissions?: string[];
  createdAt?: Date;
};

const router = new Router();
router.post("/login", async (ctx: Context): Promise<LoginResponse> => {
  const { name, email } = ctx.request.body as UserInfo;
  const user = await UserModel.findOneAndUpdate(
    { name, email },
    { lastLoginAt: new Date() },
    { new: true },
  );
  console.log(ctx)
  if (!user) {
    return ctx.body = { status: "invalid" } as LoginResponse
  }
  return ctx.body = { user: user, status: "ok" } as LoginResponse
});

export { router as authRouter };
