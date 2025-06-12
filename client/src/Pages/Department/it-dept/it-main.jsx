import React from 'react';
import {
  FaHeadset,      // Utama untuk IT/Helpdesk
  FaBell,         // Notifikasi/Tiket
  FaWarehouse,    // Inventaris IT
  FaUserCog,      // Manajemen Akun
  FaShieldAlt,    // Keamanan Jaringan
  FaChartBar,     // Laporan Sistem
  FaTools,        // Konfigurasi/Setting
  FaServer,        // Infrastruktur Server
  FaClipboardList,
  FaPlusCircle,
  FaHistory,
  FaLaptop,
  FaExchangeAlt,
  FaSearch,
  FaLock,
  FaBellSlash,
  FaUsers,
  FaKey,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ItManagementPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-info-dark mb-8 flex items-center gap-3">
        <FaHeadset className="w-8 h-8 text-info" />
        Manajemen IT & Sistem
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola infrastruktur teknologi, berikan dukungan teknis, dan pastikan keamanan sistem untuk mendukung operasional perusahaan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Helpdesk & Dukungan Teknis */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
          <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
            <FaBell className="w-5 h-5 text-info" />
            Helpdesk & Dukungan Teknis
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/it-dept/helpdesk/help-ticket" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaClipboardList className="text-sm" /> Tiket Dukungan Terbuka
              </Link>
            </li>
            <li>
              <Link to="/it-dept/helpdesk/create-ticket" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaPlusCircle className="text-sm" /> Buat Tiket Baru
              </Link>
            </li>
            <li>
              <Link to="/it-dept/helpdesk/riwayat-ticket" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaHistory className="text-sm" /> Riwayat Tiket Selesai
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Manajemen Aset IT */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaWarehouse className="w-5 h-5 text-primary" />
            Manajemen Aset IT
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/it-dept/aset-it/perangkat-it" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaLaptop className="text-sm" /> Daftar Perangkat IT
              </Link>
            </li>
            <li>
              <Link to="/it-dept/aset-it/peminjaman" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaExchangeAlt className="text-sm" /> Peminjaman & Pengembalian
              </Link>
            </li>
            <li>
              <Link to="/it-dept/aset-it/pemeliharaan" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaTools className="text-sm" /> Jadwal Perawatan Perangkat
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Keamanan Sistem & Jaringan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
            <FaShieldAlt className="w-5 h-5 text-red-500" />
            Keamanan Sistem & Jaringan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/it-dept/keamanan/kemanan-jaringan" className="flex items-center gap-2 hover:text-red-700 hover:underline">
                <FaSearch className="text-sm" /> Pemantauan Keamanan Jaringan
              </Link>
            </li>
            <li>
              <Link to="/it-dept/keamanan/akeses" className="flex items-center gap-2 hover:text-red-700 hover:underline">
                <FaLock className="text-sm" /> Pengaturan Akses & Otorisasi
              </Link>
            </li>
            <li>
              <Link to="/it-dept/keamanan/laporan-insiden" className="flex items-center gap-2 hover:text-red-700 hover:underline">
                <FaBellSlash className="text-sm" /> Pelaporan Insiden Keamanan
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Manajemen Akun & Hak Akses */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
            <FaUserCog className="w-5 h-5 text-accent" />
            Manajemen Akun & Hak Akses
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/it-dept/manajemen-akun/daftar-akun" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaUsers className="text-sm" /> Daftar Akun Pengguna
              </Link>
            </li>
            <li>
              <Link to="/it-dept/manajemen-akun/edit-akun" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaPlusCircle className="text-sm" /> Edit Akun 
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default ItManagementPage;