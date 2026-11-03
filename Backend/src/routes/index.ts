import { testRouter } from "./test.ts";
import { authRouter } from "./auth.ts";

export const routes = [
    testRouter.routes(),
    authRouter.routes()
];