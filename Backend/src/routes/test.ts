import Router from "koa-router";
import path from "path";
import Tesseract from "tesseract.js";
import { fileURLToPath } from "url";
import { createWorker } from "tesseract.js";

const router = new Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagePath = path.resolve(__dirname, "..", "sources", "test.jpg");

router.get("/test", async (ctx: any) => {
  const worker = await createWorker(["eng", "chi_sim"]);
  console.log(ctx.state?.middlewareError?.message);
  if(ctx.state?.middlewareError?.message) {
    ctx.status = 403;
    return (ctx.body = {
      status: "failed",
      code: "forbidden",
      msg: ctx.state.middlewareError.message,
    });
  }
  try {
    await worker.setParameters({
      tessedit_pageseg_mode: Tesseract.PSM.AUTO,
      preserve_interword_spaces: "1",
      user_defined_dpi: "300",
    });

    const ret = await worker.recognize(imagePath, { rotateAuto: true });
    ctx.body = { status: "ok", text: ret.data.text };
  } finally {
    await worker.terminate();
  }
});

export { router as testRouter };
