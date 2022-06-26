/**
 *  DECLARAMOS LAS LIBRERIAS y CONSTANTES A USAR!
 */
require("dotenv").config();
const client = require("venom-bot");
const express = require("express");
const cors = require("cors");
const { getCriptoPrice } = require("./libs/cryptoPrice");
const { getQR, sessionStatus, generateSticker } = require("./libs/whatsapp");
const { clientMiddleware } = require("./app/middleware/client");

const app = express();
app.use(cors());
app.use(express.json());

const SESSION_PATH = process.env.SESSION_PATH || "session";
const SESSION_NAME = process.env.SESSION_NAME || "dev";
const PORT = process.env.PORT || 8000;
const MULTI_DEVICE = process.env.MULTI_DEVICE || true;
const GENERATE_STICKER = process.env.GENERATE_STICKER || false;

client
  .create(SESSION_NAME, getQR, sessionStatus, {
    multidevice: MULTI_DEVICE,
    folderNameToken: SESSION_PATH,
    disableWelcome: true,
    autoClose: 0,
  })
  .then((client) => {
    start(client);

    /**
     * Cargamos rutas de express
     * TODO: RUTA WEB PARA SCANEAR QR
     */
    app.use("/qr", clientMiddleware(client), require("./app/routes/qr"));
  })
  .catch((erro) => {
    console.log(erro);
  });

const start = async (client) => {
  /**
   * Escuchamos cuando entre un mensaje
   */
  client.onMessage(async (message) => {
    const { type, chatId, caption } = message;
    if (
      type === "sticker" ||
      type === "ptt" ||
      type === "document" ||
      chatId === "status@broadcast" ||
      type === "ciphertext"
    )
      return;

    // OBTIENE LOS PRECIOS DE CRIPTOMONEDAS
    getCriptoPrice(message, client);

    if (type === "image" && caption === "!sticker" && GENERATE_STICKER)
      generateSticker(client, message);
  });
};

app.listen(PORT, () => {
  console.log(`El server esta corriendo en el puerto: ${PORT}`);
});
