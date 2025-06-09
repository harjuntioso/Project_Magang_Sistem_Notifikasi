import React from 'react';
import {
  FaBriefcase, // Icon umum untuk manajemen operasional
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaBell,
  FaCogs,
  FaWarehouse, // Inventaris/Logistik
  FaMoneyBillWave, // Keuangan
  FaClipboardList, // Task/Proyek
  FaHandshake, // Kemitraan/Vendor
  FaTools, // Pemeliharaan
  FaSmile, // Layanan Pelanggan (jika ada internal)
  FaUserCog, // Admin Sistem
  FaRoad, // Transportasi (jika relevan)
  FaShieldAlt, // Keamanan (jika relevan)
  FaHeadset, // Layanan Pelanggan (jika relevan)
  FaBullhorn, // Pemberitahuan (jika relevan)
  FaEnvelopeOpenText, // Kontak (jika relevan)
  FaLink    
} from 'react-icons/fa';


const ManagementOperationPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manajemen Operasional Departemen</h1>

      {/* Deskripsi Singkat */}
      <p className="text-gray-600 mb-10 text-lg">
        {/*  */}
      </p>

      {/* Grid Menu Departemen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {/* Departemen: HRD (Sumber Daya Manusia) */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaUsers className="w-5 h-5 text-primary" />
            Human Resources (HRD)
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/management/hrd/absensi" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaCalendarAlt className="text-sm" /> Kelola Absensi Karyawan
              </a>
            </li>
            <li>
              <a href="/management/hrd/cuti" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaClipboardList className="text-sm" /> Persetujuan Cuti & Izin
              </a>
            </li>
            <li>
              <a href="/management/hrd/rekrutmen" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaBriefcase className="text-sm" /> Manajemen Rekrutmen
              </a>
            </li>
            <li>
              <a href="/management/hrd/data-karyawan" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaUserCog className="text-sm" /> Database & Profil Karyawan
              </a>
            </li>
            <li>
              <a href="/management/hrd/penggajian" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaMoneyBillWave className="text-sm" /> Pengelolaan Penggajian
              </a>
            </li>
          </ul>
          <div className="text-right mt-4">
            <a href="/management/hrd" className="text-sm text-primary hover:underline">
              Lihat Semua Fitur HRD &rarr;
            </a>
          </div>
        </section>

        {/* Departemen: Operasional Lapangan / Taman Hiburan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
            <FaCogs className="w-5 h-5 text-accent" />
            Operasional Lapangan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/management/ops/jadwal-shift" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaCalendarAlt className="text-sm" /> Penjadwalan Shift Petugas
              </a>
            </li>
            <li>
              <a href="/management/ops/inventaris-atraksi" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaWarehouse className="text-sm" /> Inventaris & Stok Atraksi
              </a>
            </li>
            <li>
              <a href="/management/ops/pemeliharaan" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaTools className="text-sm" /> Laporan & Jadwal Pemeliharaan
              </a>
            </li>
            <li>
              <a href="/management/ops/insiden" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaBell className="text-sm" /> Penanganan Laporan Insiden
              </a>
            </li>
            <li>
              <a href="/management/ops/transportasi" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaRoad className="text-sm" /> Manajemen Transportasi Internal
              </a>
            </li>
          </ul>
          <div className="text-right mt-4">
            <a href="/management/operasional" className="text-sm text-accent hover:underline">
              Lihat Semua Fitur Operasional &rarr;
            </a>
          </div>
        </section>

        {/* Departemen: Keuangan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
          <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
            <FaMoneyBillWave className="w-5 h-5 text-secondary" />
            Keuangan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/management/finance/pengajuan-biaya" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaClipboardList className="text-sm" /> Persetujuan Pengajuan Biaya
              </a>
            </li>
            <li>
              <a href="/management/finance/laporan-keuangan" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaChartBar className="text-sm" /> Laporan Keuangan & Anggaran
              </a>
            </li>
            <li>
              <a href="/management/finance/vendor" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaHandshake className="text-sm" /> Manajemen Vendor & Pembayaran
              </a>
            </li>
          </ul>
          <div className="text-right mt-4">
            <a href="/management/keuangan" className="text-sm text-secondary hover:underline">
              Lihat Semua Fitur Keuangan &rarr;
            </a>
          </div>
        </section>

        {/* Departemen: IT & Sistem */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
          <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
            <FaHeadset className="w-5 h-5 text-info" />
            IT & Sistem
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/management/it/helpdesk" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaBell className="text-sm" /> Tiket Helpdesk & Dukungan
              </a>
            </li>
            <li>
              <a href="/management/it/aset-it" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaWarehouse className="text-sm" /> Inventaris Aset IT
              </a>
            </li>
            <li>
              <a href="/management/it/manajemen-akun" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaUserCog className="text-sm" /> Manajemen Akun Pengguna
              </a>
            </li>
          </ul>
          <div className="text-right mt-4">
            <a href="/management/it" className="text-sm text-info hover:underline">
              Lihat Semua Fitur IT &rarr;
            </a>
          </div>
        </section>

        {/* Departemen: Pemasaran & Komunikasi */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
            <FaBullhorn className="w-5 h-5 text-red-500" />
            Pemasaran & Komunikasi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/management/marketing/campaign" className="flex items-center gap-2 hover:text-red-700 hover:underline">
                <FaChartBar className="text-sm" /> Dashboard Kampanye Pemasaran
              </a>
            </li>
            <li>
              <a href="/management/marketing/materi" className="flex items-center gap-2 hover:text-red-700 hover:underline">
                <FaEnvelopeOpenText className="text-sm" /> Akses Materi Promosi
              </a>
            </li>
            <li>
              <a href="/management/marketing/media" className="flex items-center gap-2 hover:text-red-700 hover:underline">
                <FaLink className="text-sm" /> Media & Kolaborasi Eksternal
              </a>
            </li>
          </ul>
          <div className="text-right mt-4">
            <a href="/management/pemasaran" className="text-sm text-red-500 hover:underline">
              Lihat Semua Fitur Pemasaran &rarr;
            </a>
          </div>
        </section>

        {/* Departemen: Lainnya / Umum (Opsional) */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-400">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <FaBriefcase className="w-5 h-5 text-gray-500" />
            Umum & Administrasi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/management/umum/manajemen-proyek" className="flex items-center gap-2 hover:text-gray-700 hover:underline">
                <FaClipboardList className="text-sm" /> Manajemen Proyek Lintas Departemen
              </a>
            </li>
            <li>
              <a href="/management/umum/fasilitas" className="flex items-center gap-2 hover:text-gray-700 hover:underline">
                <FaTools className="text-sm" /> Pemesanan & Pengelolaan Fasilitas
              </a>
            </li>
            <li>
              <a href="/management/umum/aset-perusahaan" className="flex items-center gap-2 hover:text-gray-700 hover:underline">
                <FaWarehouse className="text-sm" /> Inventaris Aset Perusahaan
              </a>
            </li>
          </ul>
          <div className="text-right mt-4">
            <a href="/management/umum" className="text-sm text-gray-500 hover:underline">
              Lihat Semua Fitur Umum &rarr;
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ManagementOperationPage;