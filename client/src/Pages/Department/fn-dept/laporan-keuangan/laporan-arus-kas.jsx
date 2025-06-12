import React from 'react';
import {
  FaExchangeAlt, 
  FaMoneyBillWave, 
  FaChartBar, 
  FaCalendarAlt, 
  FaFileInvoiceDollar, 
  FaDownload, 
  FaCog,
  FaChartLine
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CashFlowReportPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
        <FaExchangeAlt className="w-8 h-8 text-purple-600" />
        Laporan Arus Kas
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Pahami pergerakan uang tunai masuk dan keluar perusahaan Anda dengan laporan arus kas yang jelas dan terperinci.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Tampilan Arus Kas */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
            <FaFileInvoiceDollar className="w-5 h-5 text-purple-500" />
            Tampilan Arus Kas
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/keuangan/arus-kas/ringkasan" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaChartBar className="text-sm" /> Ringkasan Arus Kas
              </Link>
            </li>
            <li>
              <Link to="/keuangan/arus-kas/detail" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaMoneyBillWave className="text-sm" /> Arus Kas Operasi, Investasi, Pendanaan
              </Link>
            </li>
            <li>
              <Link to="/keuangan/arus-kas/periode" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaCalendarAlt className="text-sm" /> Pilih Periode Laporan
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Analisis Arus Kas */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-violet-500">
          <h2 className="text-xl font-semibold mb-4 text-violet-700 flex items-center gap-2">
            <FaChartBar className="w-5 h-5 text-violet-500" />
            Analisis Arus Kas
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/keuangan/arus-kas/perbandingan" className="flex items-center gap-2 hover:text-violet-700 hover:underline">
                <FaChartBar className="text-sm" /> Perbandingan Periode
              </Link>
            </li>
            <li>
              <Link to="/keuangan/arus-kas/tren" className="flex items-center gap-2 hover:text-violet-700 hover:underline">
                <FaChartLine className="text-sm" /> Tren Arus Kas
              </Link>
            </li>
            <li>
              <Link to="/keuangan/arus-kas/proyeksi" className="flex items-center gap-2 hover:text-violet-700 hover:underline">
                <FaChartLine className="text-sm" /> Proyeksi Arus Kas
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Export & Pengaturan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-fuchsia-500">
          <h2 className="text-xl font-semibold mb-4 text-fuchsia-700 flex items-center gap-2">
            <FaDownload className="w-5 h-5 text-fuchsia-500" />
            Export & Pengaturan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/keuangan/arus-kas/export-pdf" className="flex items-center gap-2 hover:text-fuchsia-700 hover:underline">
                <FaDownload className="text-sm" /> Export sebagai PDF
              </Link>
            </li>
            <li>
              <Link to="/keuangan/arus-kas/export-excel" className="flex items-center gap-2 hover:text-fuchsia-700 hover:underline">
                <FaDownload className="text-sm" /> Export sebagai Excel
              </Link>
            </li>
            <li>
              <Link to="/keuangan/arus-kas/pengaturan" className="flex items-center gap-2 hover:text-fuchsia-700 hover:underline">
                <FaCog className="text-sm" /> Pengaturan Tampilan Laporan
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default CashFlowReportPage;