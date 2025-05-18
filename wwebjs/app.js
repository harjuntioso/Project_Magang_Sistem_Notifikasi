const express = require('express');
const bodyParser = require('body-parser');
const { sendMessage, isClientReady } = require('./bot');
const cors = require('cors');
const app = express();
const port = 3001;


app.use(cors());

app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({
            status: 'error',
            message: 'Nomor dan pesan wajib diisi'
        });
    }

    if (!isClientReady()) {
        return res.status(503).json({
            status: 'error',
            message: 'Client belum siap. Scan QR code terlebih dahulu.'
        });
    }

    try {
        const response = await sendMessage(number, message);
        return res.json({
            status: 'success',
            messageId: response.id.id
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Gagal mengirim pesan',
            detail: err.message
        });
    }
});

app.listen(port, () => {
    console.log(`📡 WhatsApp API server listening at http://localhost:${port}`);
});

app.get('/status', (req, res) => {
    if (!isClientReady()) {
        return res.json({
            status: 'disconnected',
            qr_code: getCurrentQrCodeBase64() // fungsi yang mengembalikan QR dalam base64
        });
    }

    return res.json({ status: 'connected' });
});
