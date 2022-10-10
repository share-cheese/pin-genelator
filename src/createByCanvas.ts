// @ts-ignore
import { createCanvas, loadImage } from "canvas";
import fs from "fs";

const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = CANVAS_WIDTH * 1.4;

const run = async () => {
  await fs.promises.rm("out", { recursive: true, force: true });

  const bases = fs.readdirSync("src/img/base");
  const items = fs.readdirSync("src/img/item");

  bases.forEach((base) => {
    items.forEach(async (item) => {
      const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, "svg");
      const ctx = canvas.getContext("2d");

      const baseSvg = await loadImage(`src/img/base/${base}`);
      const itemSvg = await loadImage(`src/img/item/${item}`);
      ctx.drawImage(baseSvg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      const itemWidth = (CANVAS_WIDTH / 100) * 48;
      ctx.drawImage(
        itemSvg,
        (CANVAS_WIDTH - itemWidth) / 2,
        (CANVAS_HEIGHT - itemWidth / 2) / 4,
        itemWidth,
        itemWidth
      );

      const baseName = base.replace(".svg", "");
      const itemName = item.replace(".svg", "");
      const symbolName = `marker-${baseName}-${itemName}`;

      await fs.promises.mkdir("out", { recursive: true });
      fs.writeFileSync(`out/${symbolName}.svg`, canvas.toBuffer());
    });
  });
};

run();
