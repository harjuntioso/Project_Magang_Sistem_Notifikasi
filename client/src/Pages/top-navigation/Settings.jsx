import React, { useState } from 'react';
import {
  FaCog,            // Utama untuk Pengaturan
  FaUserCircle,     // Pengaturan Akun
  FaBell,           // Notifikasi
  FaPalette,        // Preferensi Tampilan
  FaLock,           // Keamanan
  FaLanguage,       // Bahasa
  FaShieldAlt,      // Privasi
  FaQuestionCircle, // Bantuan
  FaKey,
} from 'react-icons/fa';

const SettingsPage = () => {
  // State dummy untuk contoh pengaturan
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('id');

  const handleSaveSettings = () => {
    alert('Pengaturan berhasil disimpan!');
    // Di sini Anda akan mengirim data pengaturan ke backend
    console.log({ receiveNotifications, darkMode, language });
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <FaCog className="w-8 h-8 text-gray-700" />
        Pengaturan
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Sesuaikan preferensi dan kelola akun Anda untuk pengalaman yang lebih personal dan efisien.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Bagian: Pengaturan Akun */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaUserCircle className="w-5 h-5 text-primary" />
            Pengaturan Akun
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Nama Lengkap</label>
              <input
                type="text"
                id="fullName"
                defaultValue="Nama Karyawan" // Ganti dengan data aktual
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Perusahaan</label>
              <input
                type="email"
                id="email"
                defaultValue="karyawan@perusahaan.com" // Ganti dengan data aktual
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <p className="text-gray-500 text-sm mt-1">Email perusahaan tidak dapat diubah.</p>
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-1">Nomor Telepon Internal</label>
              <input
                type="text"
                id="phoneNumber"
                defaultValue="+62 812 3456 7890" // Ganti dengan data aktual
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
            <div className="text-right">
              <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200">
                Update Profil
              </button>
            </div>
          </div>
        </section>

        {/* Bagian: Notifikasi */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
            <FaBell className="w-5 h-5 text-accent" />
            Preferensi Notifikasi
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Terima Notifikasi Sistem</span>
              <label htmlFor="toggle-notifications" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="toggle-notifications"
                  className="sr-only peer"
                  checked={receiveNotifications}
                  onChange={() => setReceiveNotifications(!receiveNotifications)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-accent peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
            <p className="text-gray-500 text-sm">Pilih untuk menerima notifikasi tentang pengumuman, aktivitas, dan pembaruan sistem.</p>
            {/* Opsi notifikasi lebih detail (misal: per departemen, per jenis) bisa ditambahkan di sini */}
          </div>
        </section>

        {/* Bagian: Tampilan & Bahasa */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
          <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
            <FaPalette className="w-5 h-5 text-secondary" />
            Tampilan & Bahasa
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Mode Gelap (Dark Mode)</span>
              <label htmlFor="toggle-darkmode" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="toggle-darkmode"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-secondary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>
            <div>
              <label htmlFor="language-select" className="block text-gray-700 font-medium mb-1">Bahasa</label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary transition-all duration-200"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </section>

        {/* Bagian: Keamanan & Privasi */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
          <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
            <FaLock className="w-5 h-5 text-info" />
            Keamanan & Privasi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/settings/change-password" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaKey className="text-sm" /> Ubah Kata Sandi
              </a>
            </li>
            <li>
              <a href="/settings/two-factor-auth" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaShieldAlt className="text-sm" /> Otentikasi Dua Faktor (2FA)
              </a>
            </li>
            <li>
              <a href="/settings/privacy-policy" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaQuestionCircle className="text-sm" /> Kebijakan Privasi
              </a>
            </li>
          </ul>
        </section>

      </div>
      
      {/* Tombol Simpan Global (opsional, tergantung alur simpan Anda) */}
      <div className="mt-10 text-center">
        <button
          onClick={handleSaveSettings}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
        >
          Simpan Semua Pengaturan
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;