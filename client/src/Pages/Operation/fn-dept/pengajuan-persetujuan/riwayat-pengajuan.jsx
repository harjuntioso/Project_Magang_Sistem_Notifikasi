import React from 'react';
import {
  FaHistory, FaMoneyBillWave, FaClipboardList, FaSearch, FaFilter, FaFileAlt, FaChartBar
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ExpenseHistoryPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-pink-700 mb-8 flex items-center gap-3">
        <FaHistory className="w-8 h-8 text-pink-600" />
        Riwayat Pengajuan Biaya
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lihat riwayat lengkap semua pengajuan biaya Anda atau tim, lacak status, dan akses detail kapan saja.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Daftar Riwayat */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500">
          <h2 className="text-xl font-semibold mb-4 text-pink-700 flex items-center gap-2">
            <FaClipboardList className="w-5 h-5 text-pink-500" />
            Daftar Riwayat Pengajuan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/biaya/riwayat/semua" className="flex items-center gap-2 hover:text-pink-700 hover:underline">
                <FaClipboardList className="text-sm" /> Semua Pengajuan Biaya
              </Link>
            </li>
            <li>
              <Link to="/biaya/riwayat/status" className="flex items-center gap-2 hover:text-pink-700 hover:underline">
                <FaFilter className="text-sm" /> Filter Berdasarkan Status
              </Link>
            </li>
            <li>
              <Link to="/biaya/riwayat/cari" className="flex items-center gap-2 hover:text-pink-700 hover:underline">
                <FaSearch className="text-sm" /> Cari Pengajuan
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Detail Pengajuan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-rose-500">
          <h2 className="text-xl font-semibold mb-4 text-rose-700 flex items-center gap-2">
            <FaFileAlt className="w-5 h-5 text-rose-500" />
            Detail Pengajuan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/biaya/riwayat/detail-pengajuan" className="flex items-center gap-2 hover:text-rose-700 hover:underline">
                <FaFileAlt className="text-sm" /> Lihat Detail Pengajuan
              </Link>
            </li>
            <li>
              <Link to="/biaya/riwayat/lampiran" className="flex items-center gap-2 hover:text-rose-700 hover:underline">
                <FaMoneyBillWave className="text-sm" /> Akses Lampiran Biaya
              </Link>
            </li>
            <li>
              <Link to="/biaya/riwayat/komentar" className="flex items-center gap-2 hover:text-rose-700 hover:underline">
                <FaClipboardList className="text-sm" /> Riwayat Komentar
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Laporan & Analisis */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-fuchsia-500">
          <h2 className="text-xl font-semibold mb-4 text-fuchsia-700 flex items-center gap-2">
            <FaChartBar className="w-5 h-5 text-fuchsia-500" />
            Laporan & Analisis
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/biaya/riwayat/laporan-periode" className="flex items-center gap-2 hover:text-fuchsia-700 hover:underline">
                <FaChartBar className="text-sm" /> Laporan Pengajuan Per Periode
              </Link>
            </li>
            <li>
              <Link to="/biaya/riwayat/analisis-kategori" className="flex items-center gap-2 hover:text-fuchsia-700 hover:underline">
                <FaChartBar className="text-sm" /> Analisis Biaya Berdasarkan Kategori
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default ExpenseHistoryPage;