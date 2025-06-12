import React from 'react';
import {
  FaUserPlus,       // Icon untuk tambah user/rekrutmen baru
  FaClipboardList,  // Icon untuk daftar/laporan
  FaCalendarCheck,  // Icon untuk jadwal/kalender
  FaFileAlt,        // Icon untuk dokumen/aplikasi
  FaChartLine,      // Icon untuk statistik/overview
  FaUsersCog,       // Icon untuk pengelolaan user/tim
  FaTasks,          // Icon untuk tugas/proses
  FaPaperPlane,     // Icon untuk kirim/penawaran
  FaBell,           // Icon untuk notifikasi/aplikasi baru
  FaHistory,        // Icon untuk riwayat
  FaCog,            // Icon untuk pengaturan
  FaFilter,         // Icon untuk filter
  FaEnvelopeOpenText, // Icon untuk komunikasi
  FaHandshake,      // Icon untuk onboarding/kesepakatan
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RecruitmentManagementPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-teal-700 mb-8 flex items-center gap-3">
        <FaUserPlus className="w-8 h-8 text-teal-600" />
        Manajemen Rekrutmen
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola seluruh siklus rekrutmen, mulai dari pembukaan lowongan hingga penawaran kerja, untuk menemukan talenta terbaik dan membangun tim yang solid.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Lowongan Pekerjaan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500">
          <h2 className="text-xl font-semibold mb-4 text-teal-700 flex items-center gap-2">
            <FaClipboardList className="w-5 h-5 text-teal-500" />
            Lowongan Pekerjaan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/rekrutmen/lowongan/overview" className="flex items-center gap-2 hover:text-teal-700 hover:underline">
                <FaChartLine className="text-sm" /> Dashboard Lowongan
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/lowongan/aktif" className="flex items-center gap-2 hover:text-teal-700 hover:underline">
                <FaBell className="text-sm" /> Daftar Lowongan Aktif
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/lowongan/baru" className="flex items-center gap-2 hover:text-teal-700 hover:underline">
                <FaUserPlus className="text-sm" /> Buat Lowongan Baru
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/lowongan/arsip" className="flex items-center gap-2 hover:text-teal-700 hover:underline">
                <FaHistory className="text-sm" /> Riwayat & Arsip Lowongan
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Aplikasi Pelamar */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-lime-500">
          <h2 className="text-xl font-semibold mb-4 text-lime-700 flex items-center gap-2">
            <FaFileAlt className="w-5 h-5 text-lime-500" />
            Aplikasi Pelamar
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/rekrutmen/pelamar/overview" className="flex items-center gap-2 hover:text-lime-700 hover:underline">
                <FaChartLine className="text-sm" /> Dashboard Pelamar
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/pelamar/review" className="flex items-center gap-2 hover:text-lime-700 hover:underline">
                <FaUsersCog className="text-sm" /> Review & Screening CV
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/pelamar/database" className="flex items-center gap-2 hover:text-lime-700 hover:underline">
                <FaClipboardList className="text-sm" /> Database Pelamar
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/pelamar/komunikasi" className="flex items-center gap-2 hover:text-lime-700 hover:underline">
                <FaEnvelopeOpenText className="text-sm" /> Komunikasi Pelamar
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Jadwal & Wawancara */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center gap-2">
            <FaCalendarCheck className="w-5 h-5 text-indigo-500" />
            Jadwal & Wawancara
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/rekrutmen/jadwal/kalender" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaCalendarCheck className="text-sm" /> Kalender Wawancara
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/jadwal/sesi" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaTasks className="text-sm" /> Atur Sesi Wawancara
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/jadwal/penilaian" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaClipboardList className="text-sm" /> Form Penilaian Wawancara
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/jadwal/feedback" className="flex items-center gap-2 hover:text-indigo-700 hover:underline">
                <FaChartLine className="text-sm" /> Laporan & Feedback Wawancara
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Penawaran & Onboarding */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-fuchsia-500">
          <h2 className="text-xl font-semibold mb-4 text-fuchsia-700 flex items-center gap-2">
            <FaPaperPlane className="w-5 h-5 text-fuchsia-500" />
            Penawaran & Onboarding
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/rekrutmen/penawaran/status" className="flex items-center gap-2 hover:text-fuchsia-700 hover:underline">
                <FaChartLine className="text-sm" /> Status Penawaran Kerja
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/penawaran/buat" className="flex items-center gap-2 hover:text-fuchsia-700 hover:underline">
                <FaFileAlt className="text-sm" /> Buat Surat Penawaran
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/onboarding/checklist" className="flex items-center gap-2 hover:text-fuchsia-700 hover:underline">
                <FaHandshake className="text-sm" /> Checklist Onboarding
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/onboarding/proses" className="flex items-center gap-2 hover:text-fuchsia-700 hover:underline">
                <FaUsersCog className="text-sm" /> Proses Onboarding Karyawan Baru
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Pengaturan & Laporan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <h2 className="text-xl font-semibold mb-4 text-orange-700 flex items-center gap-2">
            <FaCog className="w-5 h-5 text-orange-500" />
            Pengaturan & Laporan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/rekrutmen/pengaturan/template" className="flex items-center gap-2 hover:text-orange-700 hover:underline">
                <FaFileAlt className="text-sm" /> Template Dokumen
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/pengaturan/sumber" className="flex items-center gap-2 hover:text-orange-700 hover:underline">
                <FaFilter className="text-sm" /> Manajemen Sumber Pelamar
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/laporan/analisis" className="flex items-center gap-2 hover:text-orange-700 hover:underline">
                <FaChartLine className="text-sm" /> Analisis Data Rekrutmen
              </Link>
            </li>
            <li>
              <Link to="/rekrutmen/laporan/efisiensi" className="flex items-center gap-2 hover:text-orange-700 hover:underline">
                <FaChartLine className="text-sm" /> Laporan Efisiensi Proses
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default RecruitmentManagementPage;