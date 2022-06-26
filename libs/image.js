const fs = require("fs");
const mime = require("mime-types");
const sharp = require("sharp");

const downloadImageMessage = async (client, message) => {
  const decryptFile = await client.decryptFile(message);

  const name = Date.now();
  const file = `${name}.${mime.extension(message.mimetype)}`;

  try {
    fs.writeFile(`./temp/${file}`, decryptFile, async (err) => {
      if (err) throw err;
    });
    console.log(`[${name}] Imagen descargada con exito!`);
  } catch (err) {
    console.log(`[${name}] ${err}`);
  }

  return file;
};

const resize = async (file) => {
  const [name] = file.split(".");

  const NEW_IMAGE = await sharp(`./temp/${file}`)
    .resize({
      width: 512,
      height: 512,
      fit: "contain",
      background: {
        r: 255,
        g: 255,
        b: 255,
        alpha: 0,
      },
    })
    .webp({
      alphaQuality: 0,
    })
    .toFormat("webp")
    .toFile(`./temp/${name}_min.webp`)
    .then((info) => {
      console.log(``);
      console.log(`[${file}] El tamaño de la imagen fue optimizado.`);

      // ?Borrando la imagen original, despues que es generada en formato webp
      fs.unlink(`./temp/${file}`, (err) => {
        if (err) console.error(`[${file}]: ${err}`);
      });

      const RESIZE_IMG = `${name}_min.webp`;
      return RESIZE_IMG;
    })
    .catch((err) => {
      console.log(`[${file}] ${err}`);
    });

  return NEW_IMAGE;
};

module.exports = {
  downloadImageMessage,
  resize,
};
