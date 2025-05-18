const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');

// Status global
let isClientReady = false;
let qrCodeGenerated = false;

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './session',
        clientId: 'bot-client'
    }),
    puppeteer: {
        headless: false, // Menjalankan Puppeteer tanpa membuka browser
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ],
        timeout: 60000,
        slowMo: 100
    }
});

// Event handler untuk QR Code
client.on('qr', qr => {
    qrcode.toFile('./qr-code.png', qr, (err) => {
        if (err) {
            console.error('Gagal menyimpan QR code:', err);
        } else {
            console.log('✅ QR code berhasil disimpan di qr-code.png');
        }
    });
    qrCodeGenerated = true;
    console.log('🔐 Scan QR code di file qr-code.png');
});

// Event handler client siap
client.on('ready', () => {
    console.log('✅ Client siap!');
    isClientReady = true;
});

// Event handler jika autentikasi gagal
client.on('auth_failure', msg => {
    console.error('❌ Autentikasi gagal:', msg);
    isClientReady = false;
});

// Event handler client terputus
client.on('disconnected', reason => {
    console.warn('⚠️ Client terputus:', reason);
    isClientReady = false;
});

// client.on('ready', () => {
//     console.log('✅ Client siap!');
//     isClientReady = true;

//     // Coba kirim pesan setelah client siap
//     client.sendMessage('62895321009825@c.us', 'Tes')
//         .then(response => console.log('Pesan berhasil dikirim:', response))
//         .catch(error => console.log('Gagal mengirim pesan:', error));
// });


// Fungsi untuk mengirim pesan
async function sendMessage(number, message) {

    if (!isClientReady) {
        throw new Error('Client belum siap. Pastikan sudah scan QR dan status "Client siap!" muncul');
    }

    try {
        const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
        return await client.sendMessage(chatId, message);
    } catch (error) {
        console.error('Error saat mengirim pesan:', error);
        throw error;
    }
}

client.initialize();

module.exports = {
    client,
    sendMessage,
    isClientReady: () => isClientReady,
    qrCodeGenerated
};
