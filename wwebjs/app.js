const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// <<<--- UBAH IMPORT DARI BOT.JS ---
const { sendMessage, isClientReady, getLatestQrCodeBase64, hasQrCodeBeenGenerated } = require('./bot');

const app = express();
const port = 3001; // Pastikan ini sama dengan WHATSAPP_SERVICE_URL di Laravel .env

app.use(cors()); // Pastikan ini di atas router
app.use(bodyParser.json());

// Endpoint untuk mengirim pesan WhatsApp
app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;

    // Log awal request
    console.log('--- Incoming /send-message Request ---');
    console.log('Target Number:', number);
    console.log('Message Content (preview):', message ? message.substring(0, 50) + '...' : '');

    if (!isClientReady()) {
        console.error('ERROR: WhatsApp client is NOT ready. Cannot send message.');
        return res.status(503).json({ status: 'error', message: 'WhatsApp client is not ready. Please scan QR code or try again later.' });
    }
    console.log('WhatsApp client is reported as READY by isClientReady() check.');

    if (!number || !message) {
        console.error('ERROR: Number or message is missing.');
        return res.status(400).json({ status: 'error', message: 'Number and message are required.' });
    }

    try {
        const response = await sendMessage(number, message);
        console.log('SUCCESS: Pesan berhasil dikirim.');
        return res.json({ status: 'success', messageId: response?.id?.id || null });
    } catch (error) {
        if (error.message.includes('serialize')) {
            console.warn('WARNING: Pesan terkirim tetapi error di proses response serialize.');
            return res.json({ status: 'success', message: 'Pesan terkirim, tetapi gagal membaca response detail.' });
        }

        // Jika error lain, tetap kirimkan status 500
        console.error('FAILED: Error saat kirim pesan:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Gagal mengirim pesan',
            detail: error.message,
        });
    }

});

// Endpoint untuk cek status service dan ambil QR code
app.get('/status', (req, res) => {
    if (isClientReady()) {
        return res.json({ status: 'connected', message: 'WhatsApp client is ready.' });
    } else {
        const qrBase64 = getLatestQrCodeBase64();
        const qrGenerated = hasQrCodeBeenGenerated();
        
        if (qrGenerated && qrBase64) {
            return res.status(200).json({ status: 'disconnected', message: 'WhatsApp client needs QR scan.', qr_code: qrBase64 });
        } else if (qrGenerated && !qrBase64) {
             return res.status(200).json({ status: 'disconnected', message: 'WhatsApp client is waiting for QR code to be processed.', qr_code: null });
        }
        else {
            return res.status(200).json({ status: 'disconnected', message: 'WhatsApp client is initializing or disconnected. No QR yet.', qr_code: null });
        }
    }
});


app.listen(port, () => {
    console.log(`📡 WhatsApp API server listening at http://localhost:${port}`);
    // client.initialize() dipanggil di bot.js, jadi tidak perlu di sini
});