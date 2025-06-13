import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import {
  FaBullhorn,
  FaChartBar,
  FaEnvelopeOpenText,
  FaChartLine,
  FaPlusCircle,
  FaSearch,
  FaBook,
  FaStar,
  FaUsers,
  FaFileAlt,
  FaHandshake
} from 'react-icons/fa';
import { IoMdMegaphone } from "react-icons/io";

const MarketingManagementPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700 mb-8 flex items-center gap-3">
        <FaBullhorn className="w-8 h-8 text-red-500" />
        Manajemen Pemasaran & Komunikasi
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Rencanakan, laksanakan, dan analisis kampanye pemasaran untuk menarik pengunjung dan membangun citra positif perusahaan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Dashboard Kampanye Pemasaran */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
            <FaChartBar className="w-5 h-5 text-red-500" />
            Dashboard Kampanye Pemasaran
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              {/* Changed <a> to <Link> and href to to */}
              <Link to="/mr-dept/dashboard-kampanye/kampanye-aktif" className="flex items-center gap-2 hover:text-red-700 hover:underline">
                <FaChartLine className="text-sm" /> Ringkasan Kampanye Aktif
              </Link>
            </li>
            <li>
              <Link to="/mr-dept/dashboard-kampanye/buat-kampanye" className="flex items-center gap-2 hover:text-red-700 hover:underline">
                <FaPlusCircle className="text-sm" /> Buat Kampanye Baru
              </Link>
            </li>
            <li>
              <Link to="/mr-dept/dashboard-kampanye/data-kampanye" className="flex items-center gap-2 hover:text-red-700 hover:underline">
                <FaSearch className="text-sm" /> Analisis Data Kampanye
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Materi & Aset Promosi */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
            <FaEnvelopeOpenText className="w-5 h-5 text-purple-500" />
            Materi & Aset Promosi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/mr-dept/materi-asset/aset-digital" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaBook className="text-sm" /> Perpustakaan Aset Digital
              </Link>
            </li>
            <li>
              <Link to="/mr-dept/materi-asset/materi-request" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaPlusCircle className="text-sm" /> Ajukan Pembuatan Materi
              </Link>
            </li>
            <li>
              <Link to="/mr-dept/materi-asset/brand-logo" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaStar className="text-sm" /> Pedoman Brand & Logo
              </Link>
            </li>
          </ul>
        </section>

        {/* Card: Hubungan Masyarakat (PR) & Media */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
            <IoMdMegaphone className="w-5 h-5 text-blue-500" />
            Hubungan Masyarakat & Media
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/mr-dept/masyarakat-media/kontak-media" className="flex items-center gap-2 hover:text-blue-700 hover:underline">
                <FaUsers className="text-sm" /> Database Kontak Media
              </Link>
            </li>
            <li>
              <Link to="/mr-dept/masyarakat-media/press-release" className="flex items-center gap-2 hover:text-blue-700 hover:underline">
                <FaFileAlt className="text-sm" /> Arsip Press Release
              </Link>
            </li>
            <li>
              <Link to="/mr-dept/masyarakat-media/kolaborasi-kemitraan" className="flex items-center gap-2 hover:text-blue-700 hover:underline">
                <FaHandshake className="text-sm" /> Kolaborasi & Kemitraan
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default MarketingManagementPage;