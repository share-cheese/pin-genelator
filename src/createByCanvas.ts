// @ts-ignore
import { createCanvas, loadImage } from "canvas";
import fs from "fs";

const CANVAS_WIDTH = 200;

const run = async () => {
  await fs.promises.rm("out", { recursive: true, force: true });

  const bases = fs.readdirSync("src/img/base");
  const items = fs.readdirSync("src/img/item");

  bases.forEach((base) => {
    items.forEach(async (item) => {
      const canvas = createCanvas(CANVAS_WIDTH, CANVAS_WIDTH * 1.4, "svg");
      const ctx = canvas.getContext("2d");

      const baseSvg = await loadImage(`src/img/base/${base}`);
      const itemSvg = await loadImage(`src/img/item/${item}`);
      ctx.drawImage(baseSvg, 0, 0, CANVAS_WIDTH, CANVAS_WIDTH * 1.4);

      const itemWidth = (CANVAS_WIDTH / 100) * 48;
      ctx.drawImage(
        itemSvg,
        (CANVAS_WIDTH - itemWidth) / 2,
        (CANVAS_WIDTH * 1.4 - itemWidth) / 2 - 24,
        itemWidth,
        itemWidth
      );
      await fs.promises.mkdir("out", { recursive: true });
      fs.writeFileSync(
        `out/${base.replace(".svg", "")}-${item.replace(".svg", "")}.svg`,
        canvas.toBuffer()
      );
    });
  });
};

run();
