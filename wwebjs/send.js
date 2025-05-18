const { sendMessage, isClientReady } = require('./bot');

// Ambil argumen dari command line
const args = process.argv.slice(2); // [number, message...]
const number = args[0];
const message = args.slice(1).join(' '); // Gabungkan semua sisa argumen sebagai pesan

async function main() {
    if (!number || !message) {
        console.error('❌ Nomor dan pesan wajib diisi.');
        process.exit(1);
    }

    if (!isClientReady()) {
        console.log('⏳ Client belum siap. Pastikan QR code sudah discan.');
        process.exit(1);
    }

    try {
        const response = await sendMessage(number, message);
        console.log('✅ Pesan berhasil dikirim:', response.id.id);
    } catch (error) {
        console.error('❌ Gagal mengirim pesan:', error.message);
        process.exit(1);
    }
}

main();
