# Bot para WhatsApp 🤖

Bot para WhatsApp de multiproposito creado usando la libreria **_venom-bot_** para nodejs.

### Instruciones 📒

Descargar o Clonar repositorio

```
git clone https://github.com/ivanmercedes/ws-bot
```

Ubicate en le directorio que descargaste y via consola o terminal y ejecuta el siguiente comando

```
npm i
```

una vez se instalan todos los paquetes, para ejecutar el proyecto usa el comando:

```
npm run dev
```

### Como usarlo

El bot actualmente cuenta con 2 funciones que son **_obtener precios de criptomonedas_** y **_generar stickers_** con imagenes.

Para obtener precios de las criptomonedas se usa el siguiente comando en el chat:

```
/price btc,eth
```

Nota: por default los precios son devuelto en dolares pero si deseas recibir el precio en otra moneda basta con agregar un espacio seguido de la abreviaturas de la moneda.

Ejemplo:

```
/price btc,eth dop
```

Para generar sticker solo tienes que enviar una imagen con el caption **_!sticker_** de esta manera el bot detecta que dicha imagen se usara para generar un nuevo sticker.

### Herramientas 🛠️

- [AXIOS](https://axios-http.com/docs/intro)
- [SHARP](https://sharp.pixelplumbing.com/)
- [EXPRESS](https://expressjs.com/)
- [VENOM BOT](https://github.com/orkestral/venom#readme)
- [CRYPTOCOMPARE API](https://min-api.cryptocompare.com/documentation)

### TODO

- Agregar mas features
- Hacer refactoring
