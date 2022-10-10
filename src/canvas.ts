// @ts-ignore
import { createCanvas, loadImage } from "canvas";
import fs from "fs";

const run = async () => {
  const canvas = createCanvas(100, 140, "svg");
  const ctx = canvas.getContext("2d");

  const base = await loadImage("src/img/blue.svg");
  const item = await loadImage("src/img/circle.svg");
  ctx.drawImage(base, 0, 0, 100, 140);
  ctx.drawImage(item, 50 - 18, 24, 36, 36);
  fs.writeFileSync("out.svg", canvas.toBuffer());
};

run();
