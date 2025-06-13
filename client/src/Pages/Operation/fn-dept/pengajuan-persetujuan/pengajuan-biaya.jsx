import React from 'react';
import {
  FaCheckCircle,
  FaMoneyBillWave, 
  FaClipboardList, 
  FaUsersCog, 
  FaChartLine, 
  FaFilter, 
  FaBell,
  FaHistory
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ExpenseVerificationPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 flex items-center gap-3">
        <FaCheckCircle className="w-8 h-8 text-indigo-600" />
        Verifikasi Pengajuan Biaya
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Tinjau dan verifikasi semua pengajuan biaya yang masuk untuk memastikan kepatuhan dan keakuratan sebelum disetujui.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Pengajuan Menunggu */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center gap-2">
            <FaBell className="w-5 h-5 text-indigo-500" />
            Pengajuan Menunggu Verifikasi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/biaya/verifikasi/daftar-menunggu" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaClipboardList className="text-sm" /> Daftar Pengajuan Baru
              </Link>
            </li>
            <li>
              <Link to="/biaya/verifikasi/tugas-saya" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaUsersCog className="text-sm" /> Pengajuan Ditugaskan ke Saya
              </Link>
            </li>
            <li>
              <Link to="/biaya/verifikasi/filter" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaFilter className="text-sm" /> Filter Pengajuan
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Proses Verifikasi */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
            <FaMoneyBillWave className="w-5 h-5 text-purple-500" />
            Proses Verifikasi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/biaya/verifikasi/detail" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaClipboardList className="text-sm" /> Detail Pengajuan & Lampiran
              </Link>
            </li>
            <li>
              <Link to="/biaya/verifikasi/approve-reject" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaCheckCircle className="text-sm" /> Setujui / Tolak Pengajuan
              </Link>
            </li>
            <li>
              <Link to="/biaya/verifikasi/komentar" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaUsersCog className="text-sm" /> Tambah Komentar & Catatan
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Ringkasan Verifikasi */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-violet-500">
          <h2 className="text-xl font-semibold mb-4 text-violet-700 flex items-center gap-2">
            <FaChartLine className="w-5 h-5 text-violet-500" />
            Ringkasan Verifikasi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/biaya/verifikasi/dashboard" className="flex items-center gap-2 hover:text-violet-700 hover:underline">
                <FaChartLine className="text-sm" /> Dashboard Verifikasi
              </Link>
            </li>
            <li>
              <Link to="/biaya/verifikasi/persetujuan-terakhir" className="flex items-center gap-2 hover:text-violet-700 hover:underline">
                <FaHistory className="text-sm" /> Pengajuan Terakhir Diverifikasi
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default ExpenseVerificationPage;