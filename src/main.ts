import sharp from "sharp";

sharp("./src/img/blue.svg")
  .composite([
    {
      input: "./src/img/circle.svg",
    },
  ])
  .toFile("output.png", (err, info) => {
    if (err) {
      throw err;
    }
  });
