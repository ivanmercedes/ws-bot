const fs = require('fs');
const { downloadImageMessage, resize } = require('./image');

// ?Obtiene el codigo QR para iniciar la sesion
const getQR = (base64Qrimg, asciiQR, attempts, urlCode) => {
	console.log('Number of attempts to read the qrcode: ', attempts);
	// console.log('Terminal qrcode: ', asciiQR);
	// console.log('urlCode (data-ref): ', urlCode);
	// console.log('base64 image string qrcode: ', base64);
	const base64 = base64Qrimg.replace(/^data:image\/png;base64,/, '');
	try {
		fs.writeFile(`./temp/qr.png`, base64, 'base64', async err => {
			if (err) throw err;
		});
	} catch (err) {
		console.log(`[QR] ${err}`);
	}
};

const deleteQR = () => {
	fs.unlink(`./temp/qr.png`, err => {
		if (err) console.error(`[QR]: ${err}`);
	});
};

// ?Muestra el status de la sesion
const sessionStatus = statusSession => console.log({ statusSession });

// ?Enviar imagen como sticker
const generateSticker = async (client, message) => {
	const IMAGE = await downloadImageMessage(client, message);
	const STICKER = await resize(IMAGE);
	console.log({ STICKER });
	client
		.sendImageAsSticker(message.from, `./temp/${STICKER}`)
		.then(result => {
			// ?BORRA LA IMAGEN DESPUES QUE ES ENVIADA COMO STICKER
			fs.unlink(`./temp/${STICKER}`, err => {
				if (err) console.error(`[${STICKER}]: ${err}`);
			});
			console.log({ result });
		})
		.catch(erro => {
			console.error(`ERROR enviando el sticker[${STICKER}]: `, erro);
		});
};

module.exports = {
	getQR,
	deleteQR,
	sessionStatus,
	generateSticker,
};
