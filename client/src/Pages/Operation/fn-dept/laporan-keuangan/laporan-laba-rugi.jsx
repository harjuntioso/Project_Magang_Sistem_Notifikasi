import React from 'react';
import {
  FaChartLine, FaMoneyBillWave, FaFileInvoiceDollar, FaCalendarAlt, FaChartBar, FaDownload, FaCog
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfitLossReportPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-700 mb-8 flex items-center gap-3">
        <FaChartLine className="w-8 h-8 text-emerald-600" />
        Laporan Laba Rugi
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Analisis kinerja keuangan perusahaan Anda dengan laporan laba rugi yang komprehensif, menampilkan pendapatan, biaya, dan keuntungan bersih.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Tampilan Laporan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
          <h2 className="text-xl font-semibold mb-4 text-emerald-700 flex items-center gap-2">
            <FaFileInvoiceDollar className="w-5 h-5 text-emerald-500" />
            Tampilan Laporan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/keuangan/laba-rugi/ringkasan" className="flex items-center gap-2 hover:text-emerald-700 hover:underline">
                <FaChartLine className="text-sm" /> Ringkasan Laba Rugi
              </Link>
            </li>
            <li>
              <Link to="/keuangan/laba-rugi/detail" className="flex items-center gap-2 hover:text-emerald-700 hover:underline">
                <FaMoneyBillWave className="text-sm" /> Laporan Detail
              </Link>
            </li>
            <li>
              <Link to="/keuangan/laba-rugi/periode" className="flex items-center gap-2 hover:text-emerald-700 hover:underline">
                <FaCalendarAlt className="text-sm" /> Pilih Periode Laporan
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Analisis Laba Rugi */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
            <FaChartBar className="w-5 h-5 text-green-500" />
            Analisis Laba Rugi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/keuangan/laba-rugi/perbandingan" className="flex items-center gap-2 hover:text-green-700 hover:underline">
                <FaChartBar className="text-sm" /> Perbandingan Periode
              </Link>
            </li>
            <li>
              <Link to="/keuangan/laba-rugi/tren" className="flex items-center gap-2 hover:text-green-700 hover:underline">
                <FaChartLine className="text-sm" /> Tren Pendapatan & Biaya
              </Link>
            </li>
            <li>
              <Link to="/keuangan/laba-rugi/segmen" className="flex items-center gap-2 hover:text-green-700 hover:underline">
                <FaCog className="text-sm" /> Analisis Berdasarkan Segmen
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Export & Pengaturan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-lime-500">
          <h2 className="text-xl font-semibold mb-4 text-lime-700 flex items-center gap-2">
            <FaDownload className="w-5 h-5 text-lime-500" />
            Export & Pengaturan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/keuangan/laba-rugi/export-pdf" className="flex items-center gap-2 hover:text-lime-700 hover:underline">
                <FaDownload className="text-sm" /> Export sebagai PDF
              </Link>
            </li>
            <li>
              <Link to="/keuangan/laba-rugi/export-excel" className="flex items-center gap-2 hover:text-lime-700 hover:underline">
                <FaDownload className="text-sm" /> Export sebagai Excel
              </Link>
            </li>
            <li>
              <Link to="/keuangan/laba-rugi/pengaturan" className="flex items-center gap-2 hover:text-lime-700 hover:underline">
                <FaCog className="text-sm" /> Pengaturan Tampilan Laporan
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default ProfitLossReportPage;