const fs = require('fs');
// TODO
const getQR = async (req, res) => {
	try {
		if (fs.existsSync('./temp/qr.png')) {
			res.writeHead(200, { 'content-type': 'image/png' });
			fs.createReadStream(`./temp/qr.png`).pipe(res);
		} else {
			res.json('sesion iniciada');
		}
	} catch (error) {
		console.log(`[QR.route] ${error}`);
	}
};

module.exports = {
	getQR,
};
