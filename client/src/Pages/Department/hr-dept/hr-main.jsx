import React from 'react';
import {
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaBriefcase,
  FaUserCog,
  FaMoneyBillWave,
  FaChartLine,
  FaEnvelopeOpenText,
  FaBell,
  FaChartBar,
  FaHistory,
  FaCogs,
} from 'react-icons/fa';
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from 'react-router-dom';

const HrdManagementPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 flex items-center gap-3">
        <FaUsers className="w-8 h-8 text-primary" />
        Manajemen Human Resources (HRD)
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Absensi Karyawan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaCalendarAlt className="w-5 h-5 text-primary" />
            Absensi Karyawan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/management-operation/hr-dept/absen/dashboard-absensi" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaChartLine className="text-sm" /> Dashboard Absensi
              </Link>
            </li>
            <li>
              <Link to="/management-operation/hr-dept/absen/laporan-absensi" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaClipboardList className="text-sm" /> Laporan Kehadiran
              </Link>
            </li>
            <li>
              <Link to="/management-operation/hr-dept/absen/verifikasi-absensi" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaBell className="text-sm" /> Verifikasi Pengajuan Absen
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Cuti & Izin */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
            <FaClipboardList className="w-5 h-5 text-accent" />
            Cuti & Izin
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/management-operation/hr-dept/cuti-izin/kalender-cuti" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaUserCog className="text-sm" /> Persetujuan Cuti Karyawan
              </Link>
            </li>
            <li>
              <Link to="/management-operation/hr-dept/cuti-izin/kuota-cuti" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaChartBar className="text-sm" /> Pengelolaan Kuota Cuti
              </Link>
            </li>
            <li>
              <Link to="/management-operation/hr-dept/cuti-izin/persetujuan-cuti" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaCalendarAlt className="text-sm" /> Kalender Cuti Terencana
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Data Karyawan & Profil */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
          <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
            <FaUserCog className="w-5 h-5 text-info" />
            Karyawan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/management-operation/hr-dept/data-karyawan/daftar-karywan" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaUsers className="text-sm" /> Daftar Karyawan Aktif
              </Link>
            </li>
             <li>
              <Link to="/management-operation/hr-dept/data-karyawan/manajemen-rekurtmen" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaBriefcase className="text-sm" /> Manajemen Rekrutmen
              </Link>
            </li>
            <li>
              <Link to="/management-operation/hr-dept/data-karyawan/riwayat-karyawan" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <IoMdPersonAdd className="text-sm" /> Tambah Karyawan Baru
              </Link>
            </li>
            <li>
              <Link to="/management-operation/hr-dept/data-karyawan/tambah-karywan" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaHistory className="text-sm" /> Riwayat Karyawan
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Penggajian */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
          <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
            <FaMoneyBillWave className="w-5 h-5 text-secondary" />
            Penggajian
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/management-operation/hr-dept/penggajian/gaji-bulanan" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaCogs className="text-sm" /> Proses Gaji Bulanan
              </Link>
            </li>
            <li>
              <Link to="/management-operation/hr-dept/penggajian/laporan-penggajian" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaChartBar className="text-sm" /> Laporan Penggajian
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default HrdManagementPage;