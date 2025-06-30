const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode'); // Pastikan ini untuk qrcode package, bukan qrcode-terminal
const fs = require('fs');

// Status global
let isClientReady = false;
let latestQrCodeBase64 = null; // <<<--- BARU: Untuk menyimpan QR code dalam Base64
let qrCodeGeneratedFlag = false; // <<<--- BARU: Flag apakah QR code pernah dibuat

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './session',
        clientId: 'bot-client'
    }),
    puppeteer: {
        headless: true, // Ubah ke false jika ingin melihat browser Chrome
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            // '--disable-web-security', // Biasanya tidak diperlukan dan bisa jadi risiko keamanan
        ],
        timeout: 60000,
        // slowMo: 100 // Biasanya tidak diperlukan untuk produksi
    },
    webVersionCache: { // Tambahkan ini jika belum ada untuk kompatibilitas
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wwebjs/web-versions/main/release/latest.json',
    }
});

// Event handler untuk QR Code
client.on('qr', async qr => { // <<<--- Buat async
    console.log('🔐 Scan QR code di file qr-code.png');
    qrcode.toFile('./qr-code.png', qr, (err) => {
        if (err) {
            console.error('Gagal menyimpan QR code:', err);
        } else {
            console.log('✅ QR code berhasil disimpan di qr-code.png');
        }
    });

    // BARU: Convert QR ke Base64 dan simpan
    try {
        latestQrCodeBase64 = await qrcode.toDataURL(qr); // <<<--- Convert to Data URL (Base64)
        qrCodeGeneratedFlag = true;
        console.log('✅ QR code Base64 siap untuk API.');
    } catch (err) {
        console.error('Gagal mengkonversi QR code ke Base64:', err);
        latestQrCodeBase64 = null;
    }
});

// Event handler client siap
client.on('ready', () => {
    console.log('✅ Client siap!');
    isClientReady = true;
    latestQrCodeBase64 = null; // Reset QR code setelah client siap
    qrCodeGeneratedFlag = false; // Reset flag
});

// Event handler jika autentikasi gagal
client.on('auth_failure', msg => {
    console.error('❌ Autentikasi gagal:', msg);
    isClientReady = false;
    latestQrCodeBase64 = null; // Reset QR code
    qrCodeGeneratedFlag = false;
    // Opsional: Hapus session file jika otentikasi gagal parah
    // const sessionPath = './session/'; // Ganti dengan path dataPath di LocalAuth
    // if (fs.existsSync(sessionPath)) {
    //     fs.rmdirSync(sessionPath, { recursive: true });
    //     console.log('Session data cleared due to auth failure.');
    // }
});

// Event handler client terputus
client.on('disconnected', reason => {
    console.warn('⚠️ Client terputus:', reason);
    isClientReady = false;
    latestQrCodeBase64 = null; // Reset QR code
    qrCodeGeneratedFlag = false;
    // Opsional: Coba inisialisasi ulang
    // client.initialize();
});

// Event handler untuk debugging pesan masuk (opsional)
client.on('message', message => {
    // console.log('Message received:', message.body);
});


// Fungsi untuk mengirim pesan
async function sendMessage(number, message) {
    if (!isClientReady) {
        throw new Error('Client belum siap. Pastikan sudah scan QR dan status "Client siap!" muncul');
    }

    try {
        const chatId = number.includes('@c.us') ? number : `${number}@c.us`;

        // Validasi apakah nomor terdaftar di WhatsApp
        const isRegistered = await client.isRegisteredUser(chatId);
        if (!isRegistered) {
            console.error(`Nomor ${chatId} tidak terdaftar di WhatsApp.`);
            throw new Error(`Nomor ${chatId} tidak terdaftar di WhatsApp.`);
        }

        // Gunakan fallback getChatById untuk meminimalisir error serialize
        let chat = null;
        try {
            chat = await client.getChatById(chatId);
        } catch (err) {
            console.warn('Chat belum pernah ada, akan coba kirim langsung.');
        }

        let response = null;
        if (chat) {
            response = await chat.sendMessage(message);
        } else {
            response = await client.sendMessage(chatId, message);
        }

        return response;
    } catch (error) {
        console.error('Error saat mengirim pesan:', error);
        throw error;
    }
}

client.initialize();

// <<<--- BARU: Export fungsi dan variabel yang dibutuhkan app.js
module.exports = {
    client,
    sendMessage,
    isClientReady: () => isClientReady, // Mengembalikan boolean status ready
    getLatestQrCodeBase64: () => latestQrCodeBase64, // Mengembalikan QR code Base64
    hasQrCodeBeenGenerated: () => qrCodeGeneratedFlag, // Mengembalikan flag apakah QR pernah dibuat
};