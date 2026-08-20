import Router from "koa-router";
import path from "path";
import { fileURLToPath } from "url";
import { createWorker } from "tesseract.js";

const router = new Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagePath = path.resolve(__dirname, "..", "sources", "test.jpg");

router.get("/test", async (ctx: any) => {
  const worker = await createWorker(["eng", "chi_sim"]);

  try {
    await worker.setParameters({
      tessedit_pageseg_mode: "3",
      preserve_interword_spaces: "1",
      user_defined_dpi: "300",
    });

    const ret = await worker.recognize(imagePath, { rotateAuto: true });
    console.log(ret.data);
    ctx.body = { status: "ok", text: ret.data.text };
  } finally {
    await worker.terminate();
  }
});

export { router as testRouter };
