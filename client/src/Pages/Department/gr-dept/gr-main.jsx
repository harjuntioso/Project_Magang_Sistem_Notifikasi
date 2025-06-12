import React from 'react';
import {
  FaBriefcase,     // Utama untuk Umum/Administrasi
  FaClipboardList, // Manajemen Proyek
  FaTools,         // Fasilitas
  FaWarehouse,     // Aset Perusahaan
  FaFileAlt,       // Dokumen/Arsip
  FaCalendarAlt,   // Pemesanan Ruangan
  FaBuilding ,      // Gedung/Fasilitas
  FaChartBar,
  FaPlusCircle,
  FaTasks,
  FaExclamationTriangle,
  FaShoppingCart,
  FaHistory,

} from 'react-icons/fa';

const GeneralManagementPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-8 flex items-center gap-3">
        <FaBriefcase className="w-8 h-8 text-gray-500" />
        Manajemen Umum & Administrasi
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Fasilitasi kelancaran operasional harian, pengelolaan aset, dan koordinasi proyek antar departemen.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Manajemen Proyek Lintas Departemen */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-400">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <FaClipboardList className="w-5 h-5 text-gray-500" />
            Manajemen Proyek
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/umum/proyek/dashboard" className="flex items-center gap-2 hover:text-gray-700 hover:underline"><FaChartBar className="text-sm" /> Dashboard Proyek</a></li>
            <li><a href="/umum/proyek/baru" className="flex items-center gap-2 hover:text-gray-700 hover:underline"><FaPlusCircle className="text-sm" /> Buat Proyek Baru</a></li>
            <li><a href="/umum/proyek/progress" className="flex items-center gap-2 hover:text-gray-700 hover:underline"><FaTasks className="text-sm" /> Pemantauan Progress Proyek</a></li>
          </ul>
        </section>

        {/* Card: Pengelolaan Fasilitas Kantor */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
            <FaTools className="w-5 h-5 text-purple-500" />
            Pengelolaan Fasilitas Kantor
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/umum/fasilitas/pemesanan-ruangan" className="flex items-center gap-2 hover:text-purple-700 hover:underline"><FaCalendarAlt className="text-sm" /> Pemesanan Ruangan Rapat</a></li>
            <li><a href="/umum/fasilitas/lapor-kerusakan" className="flex items-center gap-2 hover:text-purple-700 hover:underline"><FaExclamationTriangle className="text-sm" /> Lapor Kerusakan Fasilitas</a></li>
            <li><a href="/umum/fasilitas/daftar-fasilitas" className="flex items-center gap-2 hover:text-purple-700 hover:underline"><FaBuilding className="text-sm" /> Daftar Fasilitas & Denah</a></li>
          </ul>
        </section>

        {/* Card: Manajemen Aset Perusahaan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold mb-4 text-yellow-700 flex items-center gap-2">
            <FaWarehouse className="w-5 h-5 text-yellow-500" />
            Manajemen Aset Perusahaan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/umum/aset/inventaris" className="flex items-center gap-2 hover:text-yellow-700 hover:underline"><FaClipboardList className="text-sm" /> Daftar Inventaris Non-IT</a></li>
            <li><a href="/umum/aset/pengadaan" className="flex items-center gap-2 hover:text-yellow-700 hover:underline"><FaShoppingCart className="text-sm" /> Pengajuan Pengadaan Barang</a></li>
            <li><a href="/umum/aset/riwayat" className="flex items-center gap-2 hover:text-yellow-700 hover:underline"><FaHistory className="text-sm" /> Riwayat Aset & Lokasi</a></li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default GeneralManagementPage;