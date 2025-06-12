import React from 'react';
import {
  FaBus, FaCar, FaClipboardList, FaCalendarAlt, FaChartBar, FaUsers, FaGasPump, FaTools, FaBell, FaHistory
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const InternalTransportationPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
        <FaBus className="w-8 h-8 text-purple-600" />
        Manajemen Transportasi Internal
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola armada kendaraan dan operasional transportasi di dalam area taman untuk efisiensi pergerakan staf dan barang.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Armada Kendaraan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
            <FaCar className="w-5 h-5 text-purple-500" />
            Armada Kendaraan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/transportasi/armada/daftar" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaBus className="text-sm" /> Daftar Kendaraan
              </Link>
            </li>
            <li>
              <Link to="/transportasi/armada/tambah" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaPlusSquare className="text-sm" /> Tambah Kendaraan Baru
              </Link>
            </li>
            <li>
              <Link to="/transportasi/armada/dokumen" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaFileAlt className="text-sm" /> Dokumen & Perizinan Kendaraan
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Operasional & Penugasan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-violet-500">
          <h2 className="text-xl font-semibold mb-4 text-violet-700 flex items-center gap-2">
            <FaUsers className="w-5 h-5 text-violet-500" />
            Operasional & Penugasan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/transportasi/operasional/jadwal" className="flex items-center gap-2 hover:text-violet-700 hover:underline">
                <FaCalendarAlt className="text-sm" /> Jadwal Rute & Pengantaran
              </Link>
            </li>
            <li>
              <Link to="/transportasi/operasional/pengemudi" className="flex items-center gap-2 hover:text-violet-700 hover:underline">
                <FaUsers className="text-sm" /> Penugasan Pengemudi
              </Link>
            </li>
            <li>
              <Link to="/transportasi/operasional/permintaan" className="flex items-center gap-2 hover:text-violet-700 hover:underline">
                <FaClipboardList className="text-sm" /> Permintaan Transportasi
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Pemeliharaan & Bahan Bakar */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center gap-2">
            <FaTools className="w-5 h-5 text-indigo-500" />
            Pemeliharaan & Bahan Bakar
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/transportasi/pemeliharaan/jadwal" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaTools className="text-sm" /> Jadwal Pemeliharaan Kendaraan
              </Link>
            </li>
            <li>
              <Link to="/transportasi/pemeliharaan/laporan" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaClipboardList className="text-sm" /> Laporan Kerusakan
              </Link>
            </li>
            <li>
              <Link to="/transportasi/bbm/data" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaGasPump className="text-sm" /> Data Penggunaan Bahan Bakar
              </Link>
            </li>
            <li>
              <Link to="/transportasi/bbm/notifikasi" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaBell className="text-sm" /> Notifikasi Servis & Pajak
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Laporan & Analisis */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-deep-purple-500">
          <h2 className="text-xl font-semibold mb-4 text-deep-purple-700 flex items-center gap-2">
            <FaChartBar className="w-5 h-5 text-deep-purple-500" />
            Laporan & Analisis
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/transportasi/laporan/kinerja" className="flex items-center gap-2 hover:text-deep-purple-700 hover:underline">
                <FaChartBar className="text-sm" /> Analisis Kinerja Armada
              </Link>
            </li>
            <li>
              <Link to="/transportasi/laporan/biaya" className="flex items-center gap-2 hover:text-deep-purple-700 hover:underline">
                <FaChartBar className="text-sm" /> Laporan Biaya Operasional
              </Link>
            </li>
            <li>
              <Link to="/transportasi/laporan/riwayat" className="flex items-center gap-2 hover:text-deep-purple-700 hover:underline">
                <FaHistory className="text-sm" /> Riwayat Perjalanan
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default InternalTransportationPage;