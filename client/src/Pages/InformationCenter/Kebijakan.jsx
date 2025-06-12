import React from 'react';
import {
  FaBook,
  FaUsers,
  FaCogs,
  FaHeadset,
  FaEnvelopeOpenText,
  FaFileAlt, // Dokumen generik
  FaShieldAlt, // Kebijakan keamanan
  FaClipboardList, // Prosedur
  FaCalendarAlt,
  FaMoneyBillWave,
  FaSmile, 
  FaBriefcase,
  FaShoppingCart,
  FaLaptop,
  FaLock,
  FaUserCog
} from 'react-icons/fa';

const KebijakanPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 flex items-center gap-3">
        <FaBook className="w-8 h-8 text-primary" />
        Kebijakan & Prosedur Perusahaan
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Temukan semua kebijakan dan prosedur resmi perusahaan untuk panduan kerja yang jelas dan konsisten.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Kebijakan HRD */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaUsers className="w-5 h-5 text-primary" />
            Kebijakan Human Resources (HRD)
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/informasi/kebijakan-hrd/cuti" className="flex items-center gap-2 hover:text-primary-dark hover:underline"><FaCalendarAlt className="text-sm" /> Kebijakan Cuti & Izin</a></li>
            <li><a href="/informasi/kebijakan-hrd/gaji" className="flex items-center gap-2 hover:text-primary-dark hover:underline"><FaMoneyBillWave className="text-sm" /> Kebijakan Gaji & Tunjangan</a></li>
            <li><a href="/informasi/kebijakan-hrd/perilaku" className="flex items-center gap-2 hover:text-primary-dark hover:underline"><FaSmile className="text-sm" /> Kode Etik & Perilaku Karyawan</a></li>
            <li><a href="/informasi/kebijakan-hrd/onboarding" className="flex items-center gap-2 hover:text-primary-dark hover:underline"><FaBriefcase className="text-sm" /> Prosedur Onboarding Karyawan</a></li>
          </ul>
        </section>

        {/* Card: Prosedur Operasional Standar (SOP) */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
            <FaCogs className="w-5 h-5 text-accent" />
            Prosedur Operasional Standar (SOP)
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/informasi/kebijakan-operasional/pengadaan" className="flex items-center gap-2 hover:text-accent-dark hover:underline"><FaShoppingCart className="text-sm" /> SOP Pengadaan Barang & Jasa</a></li>
            <li><a href="/informasi/kebijakan-operasional/keamanan" className="flex items-center gap-2 hover:text-accent-dark hover:underline"><FaShieldAlt className="text-sm" /> SOP Keamanan Area & Pengunjung</a></li>
            <li><a href="/informasi/kebijakan-operasional/laporan" className="flex items-center gap-2 hover:text-accent-dark hover:underline"><FaClipboardList className="text-sm" /> Prosedur Pelaporan Insiden</a></li>
          </ul>
        </section>

        {/* Card: Kebijakan IT & Keamanan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
          <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
            <FaHeadset className="w-5 h-5 text-info" />
            Kebijakan IT & Keamanan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/informasi/kebijakan-it/penggunaan-perangkat" className="flex items-center gap-2 hover:text-info-dark hover:underline"><FaLaptop className="text-sm" /> Kebijakan Penggunaan Perangkat</a></li>
            <li><a href="/informasi/kebijakan-it/keamanan-data" className="flex items-center gap-2 hover:text-info-dark hover:underline"><FaLock className="text-sm" /> Kebijakan Keamanan Data</a></li>
            <li><a href="/informasi/kebijakan-it/akses-sistem" className="flex items-center gap-2 hover:text-info-dark hover:underline"><FaUserCog className="text-sm" /> Kebijakan Akses Sistem</a></li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default KebijakanPage;