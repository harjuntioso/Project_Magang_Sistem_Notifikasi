import React from 'react';
import {
  FaMoneyCheckAlt,
   FaChartPie, 
   FaPlusSquare, 
   FaClipboardList, 
   FaBell, 
   FaChartBar, 
   FaHistory, 
   FaCog,
   FaChartLine
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BudgetMonitoringPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-3">
        <FaMoneyCheckAlt className="w-8 h-8 text-blue-600" />
        Pemantauan Anggaran
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lacak pengeluaran Anda terhadap anggaran yang dialokasikan, identifikasi deviasi, dan pastikan disiplin finansial.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Pengelolaan Anggaran */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
            <FaPlusSquare className="w-5 h-5 text-blue-500" />
            Pengelolaan Anggaran
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/keuangan/anggaran/baru" className="flex items-center gap-2 hover:text-blue-700 hover:underline">
                <FaPlusSquare className="text-sm" /> Buat Anggaran Baru
              </Link>
            </li>
            <li>
              <Link to="/keuangan/anggaran/daftar" className="flex items-center gap-2 hover:text-blue-700 hover:underline">
                <FaClipboardList className="text-sm" /> Daftar Anggaran Aktif
              </Link>
            </li>
            <li>
              <Link to="/keuangan/anggaran/edit" className="flex items-center gap-2 hover:text-blue-700 hover:underline">
                <FaCog className="text-sm" /> Edit Anggaran
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Pemantauan & Analisis */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-cyan-500">
          <h2 className="text-xl font-semibold mb-4 text-cyan-700 flex items-center gap-2">
            <FaChartPie className="w-5 h-5 text-cyan-500" />
            Pemantauan & Analisis
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/keuangan/anggaran/dashboard" className="flex items-center gap-2 hover:text-cyan-700 hover:underline">
                <FaChartPie className="text-sm" /> Dashboard Anggaran
              </Link>
            </li>
            <li>
              <Link to="/keuangan/anggaran/deviasi" className="flex items-center gap-2 hover:text-cyan-700 hover:underline">
                <FaChartBar className="text-sm" /> Analisis Deviasi Anggaran
              </Link>
            </li>
            <li>
              <Link to="/keuangan/anggaran/notifikasi" className="flex items-center gap-2 hover:text-cyan-700 hover:underline">
                <FaBell className="text-sm" /> Notifikasi Batas Anggaran
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Laporan Anggaran */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center gap-2">
            <FaHistory className="w-5 h-5 text-indigo-500" />
            Laporan Anggaran
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/keuangan/anggaran/laporan-pengeluaran" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaClipboardList className="text-sm" /> Laporan Pengeluaran vs Anggaran
              </Link>
            </li>
            <li>
              <Link to="/keuangan/anggaran/riwayat" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaHistory className="text-sm" /> Riwayat Anggaran
              </Link>
            </li>
            <li>
              <Link to="/keuangan/anggaran/proyeksi" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaChartLine className="text-sm" /> Proyeksi Anggaran
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default BudgetMonitoringPage;