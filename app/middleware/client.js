/**
 * Middleware para tener la sesion de cliente disponible en express
 * @param  {object} client
 */
const clientMiddleware =
  (client = null) =>
  async (req, res, next) => {
    try {
      if (!client) {
        res.status(409);
        console.log(client);
        res.send({ error: "Error de client." });
      } else {
        req.wsClient = client;
        next();
      }
    } catch (e) {
      console.log(e);
      res.status(409);
      res.send({ error: "Error de client" });
    }
  };
module.exports = { clientMiddleware };
