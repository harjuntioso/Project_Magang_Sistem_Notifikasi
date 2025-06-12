import React from 'react';
import {
  FaMoneyBillWave,
  FaChartBar,
  FaClipboardList,
  FaHandshake,
  FaFileInvoiceDollar, // Faktur
  FaRegCreditCard, // Pembayaran
  FaReceipt, // Pengajuan biaya
  FaHistory, // Laporan keuangan
  FaChartLine, // Dashboard keuangan
  FaUsers
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FinanceManagementPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-secondary-dark mb-8 flex items-center gap-3">
        <FaMoneyBillWave className="w-8 h-8 text-secondary" />
        Manajemen Keuangan
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola semua transaksi keuangan, anggaran, dan hubungan dengan vendor untuk memastikan kesehatan finansial perusahaan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Pengajuan & Persetujuan Biaya */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
          <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
            <FaReceipt className="w-5 h-5 text-secondary" />
            Pengajuan & Persetujuan Biaya
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/fn-dept/pengajuan-persetujuan/pengajuan-biaya" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaClipboardList className="text-sm" /> Verifikasi Pengajuan Biaya
              </Link>
            </li>
            <li>
              <Link to="/fn-dept/pengajuan-persetujuan/riwayat-pengajuan" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaHistory className="text-sm" /> Riwayat Pengajuan Biaya
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Laporan Keuangan & Anggaran */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
          <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
            <FaChartBar className="w-5 h-5 text-info" />
            Laporan Keuangan & Anggaran
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/fn-dept/laporan-keuangan/laporan-laba-rugi" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaChartBar className="text-sm" /> Laporan Laba Rugi
              </Link>
            </li>
            <li>
              <Link to="/fn-dept/laporan-keuangan/pemantuan-anggran" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaMoneyBillWave className="text-sm" /> Pemantauan Anggaran
              </Link>
            </li>
            <li>
              <Link to="/fn-dept/laporan-keuangan/laporan-arus-kas" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaChartLine className="text-sm" /> Laporan Arus Kas
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Manajemen Vendor & Pembayaran */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaHandshake className="w-5 h-5 text-primary" />
            Manajemen Vendor & Pembayaran
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/fn-dept/vendor-pembayaran/daftar-vendor" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaUsers className="text-sm" /> Daftar Vendor Aktif
              </Link>
            </li>
            <li>
              <Link to="/fn-dept/vendor-pembayaran/status-pembayaran" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaRegCreditCard className="text-sm" /> Jadwal & Status Pembayaran
              </Link>
            </li>
            <li>
              <Link to="/fn-dept/vendor-pembayaran/kelola-faktur" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaFileInvoiceDollar className="text-sm" /> Kelola Faktur Masuk
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default FinanceManagementPage;