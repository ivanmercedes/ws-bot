const axios = require("axios");

/**
 * Funcion para obtener los precios de las criptomonedas desde el API de crypto compare y envia el resultado por mensaje
 * @param  {object} message
 * @param  {object} client
 */
const getCriptoPrice = async (message, client) => {
  const { body, from, type } = message;
  console.log({ body }, { type });
  if (body.toLowerCase().includes("/price")) {
    const msgData = body.toLowerCase().split(" ");
    const coins = msgData[1];
    const currency = msgData[2] ? msgData[2] : "USD";

    const { data } = await axios.get(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coins}&tsyms=${currency}`,
    );

    if (data.Response === "Error") await client.sendText(from, data.Message);

    const { RAW } = data;

    let send_price = "";
    Object.entries(RAW).map((crypto) => {
      send_price += `${crypto[0]} - ${currency.toUpperCase()}$ ${Object.entries(
        crypto[1],
      )[0][1]
        .PRICE.toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n`;
    });

    client
      .sendText(from, send_price)
      .then((result) => console.log)
      .catch((erro) => console.error);
  }
};

module.exports = {
  getCriptoPrice,
};
