import React from 'react';
import {
  FaCogs,
  FaCalendarAlt,
  FaWarehouse,
  FaTools,
  FaBell,
  FaShieldAlt, // Keamanan Atraksi
  FaChartBar, // Untuk laporan operasional
  FaClipboardList,
  FaUsers,
  FaHistory,
  FaSearch
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OpsManagementPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-accent-dark mb-8 flex items-center gap-3">
        <FaCogs className="w-8 h-8 text-accent" />
        Manajemen Operasional Lapangan
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Atur dan pantau seluruh aktivitas operasional di area tamsya/hiburan untuk memastikan kelancaran dan keamanan pengunjung.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Penjadwalan Shift */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
            <FaCalendarAlt className="w-5 h-5 text-accent" />
            Penjadwalan Shift Petugas
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><Link to="/op-dept/jadwal-shift/atur-shift" className="flex items-center gap-2 hover:text-accent-dark hover:underline"><FaClipboardList className="text-sm" /> Buat & Atur Jadwal Shift</Link></li>
            <li><Link to="/op-dept/jadawl-shift/verifikasi-kehadiran" className="flex items-center gap-2 hover:text-accent-dark hover:underline"><FaUsers className="text-sm" /> Verifikasi Kehadiran Shift</Link></li>
            <li><Link to="/op-dept/jadwal-shift/laporan-kinerja" className="flex items-center gap-2 hover:text-accent-dark hover:underline"><FaChartBar className="text-sm" /> Laporan Kinerja Shift</Link></li>
          </ul>
        </section>

        {/* Card: Inventaris & Stok Atraksi */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
          <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
            <FaWarehouse className="w-5 h-5 text-secondary" />
            Inventaris & Stok Atraksi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><Link to="/op-dept/inventaris/daftar-inventaris" className="flex items-center gap-2 hover:text-secondary-dark hover:underline"><FaClipboardList className="text-sm" /> Daftar Inventaris Atraksi</Link></li>
            <li><Link to="/op-dept/inventaris/stock-suku-cadang" className="flex items-center gap-2 hover:text-secondary-dark hover:underline"><FaTools className="text-sm" /> Pemantauan Stok Suku Cadang</Link></li>
            <li><Link to="/op-dept/inventaris/bahan-baku" className="flex items-center gap-2 hover:text-secondary-dark hover:underline"><FaBell className="text-sm" /> Permintaan Bahan Baku/Barang</Link></li>
          </ul>
        </section>

        {/* Card: Pemeliharaan & Perbaikan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
          <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
            <FaTools className="w-5 h-5 text-info" />
            Pemeliharaan & Perbaikan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><Link to="/op-dept/jadwal-pemeliharaan/jadwal-pemeliharaan" className="flex items-center gap-2 hover:text-info-dark hover:underline"><FaCalendarAlt className="text-sm" /> Jadwal Pemeliharaan Rutin</Link></li>
            <li><Link to="/op-dept/jadwal-pemeliharaan/laporan-pemeliharaan" className="flex items-center gap-2 hover:text-info-dark hover:underline"><FaClipboardList className="text-sm" /> Laporan Kerusakan & Perbaikan</Link></li>
            <li><Link to="/op-dept/jadwal-pemeliharaan/riwayat-pemeliharaan" className="flex items-center gap-2 hover:text-info-dark hover:underline"><FaHistory className="text-sm" /> Riwayat Pemeliharaan Atraksi</Link></li>
          </ul>
        </section>

        {/* Card: Penanganan Insiden & Keamanan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
            <FaShieldAlt className="w-5 h-5 text-red-500" />
            Penanganan Insiden & Keamanan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><Link to="/op-dept/laporan-insiden/laporan-insiden" className="flex items-center gap-2 hover:text-red-700 hover:underline"><FaBell className="text-sm" /> Lapor Insiden Baru</Link></li>
            <li><Link to="/op-dept/laporan-insiden/daftar-inside" className="flex items-center gap-2 hover:text-red-700 hover:underline"><FaClipboardList className="text-sm" /> Daftar Insiden Terbuka</Link></li>
            <li><Link to="/op-dept/laporan-insiden/pemantuan-keamanan" className="flex items-center gap-2 hover:text-red-700 hover:underline"><FaSearch className="text-sm" /> Pemantauan Keamanan Area</Link></li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default OpsManagementPage;