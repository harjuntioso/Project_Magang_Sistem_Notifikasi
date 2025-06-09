import React from 'react';
import {
  FaBook,
  FaUsers,
  FaCogs,
  FaHeadset,
  FaEnvelopeOpenText,
  FaUserFriends,
  FaBell,
  FaHistory,
  FaChartBar,
  FaQuestionCircle, // Icon baru untuk FAQ
  FaBullhorn,
  FaCalendarAlt,
  FaMapMarkerAlt, // Icon baru untuk Lokasi
  FaMap, // Icon baru untuk Denah
  FaBus, // Icon baru untuk Transportasi
  FaSearch, // Icon untuk tombol cari
} from 'react-icons/fa';

const InformationPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Pusat Informasi Karyawan</h1>

      {/* Bagian Overview / Pencarian Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaBook className="w-5 h-5 text-info" />
          Cari Informasi
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Cari kebijakan, panduan, atau kontak..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-all duration-200"
          />
          <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center gap-2">
            <FaSearch className="w-4 h-4" /> Cari
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-3">
          Temukan semua yang Anda butuhkan dengan cepat.
        </p>
      </section>

      {/* Grid Kategori Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Kategori: Kebijakan & Prosedur Perusahaan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaBook className="w-5 h-5 text-primary" />
            Kebijakan & Prosedur Perusahaan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/informasi/kebijakan-hrd" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaUsers className="text-sm" /> Kebijakan HRD (Cuti, Gaji, dll.)
              </a>
            </li>
            <li>
              <a href="/informasi/kebijakan-operasional" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaCogs className="text-sm" /> Prosedur Operasional Standar (SOP)
              </a>
            </li>
            <li>
              <a href="/informasi/kebijakan-it" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaHeadset className="text-sm" /> Kebijakan Penggunaan IT & Keamanan
              </a>
            </li>
            <li>
              <a href="/informasi/kode-etik" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaEnvelopeOpenText className="text-sm" /> Kode Etik & Tata Perilaku
              </a>
            </li>
          </ul>
          <div className="text-right mt-4">
            <a href="/informasi/kebijakan" className="text-sm text-primary hover:underline">
              Lihat Semua Kebijakan &rarr;
            </a>
          </div>
        </section>

        {/* Kategori: Direktori & Kontak */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
            <FaUserFriends className="w-5 h-5 text-accent" />
            Direktori & Kontak
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/informasi/direktori-karyawan" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaUsers className="text-sm" /> Direktori Karyawan
              </a>
            </li>
            <li>
              <a href="/informasi/kontak-departemen" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaUserFriends className="text-sm" /> Kontak Departemen
              </a>
            </li>
            <li>
              <a href="/informasi/kontak-darurat" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaBell className="text-sm" /> Kontak Darurat & Helpdesk
              </a>
            </li>
          </ul>
          <div className="text-right mt-4">
            <a href="/informasi/kontak" className="text-sm text-accent hover:underline">
              Lihat Semua Kontak &rarr;
            </a>
          </div>
        </section>

        {/* Kategori: Panduan & Sumber Daya */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
          <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
            <FaHistory className="w-5 h-5 text-secondary" />
            Panduan & Sumber Daya
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/informasi/panduan-sistem" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaChartBar className="text-sm" /> Panduan Penggunaan Sistem Internal
              </a>
            </li>
            <li>
              <a href="/informasi/template-dokumen" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaEnvelopeOpenText className="text-sm" /> Template Dokumen Resmi
              </a>
            </li>
            <li>
              <a href="/informasi/faq" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaQuestionCircle className="text-sm" /> FAQ (Pertanyaan Sering Diajukan)
              </a>
            </li>
            <li>
              <a href="/informasi/pelatihan" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaBullhorn className="text-sm" /> Materi Pelatihan & Pengembangan
              </a>
            </li>
          </ul>
          <div className="text-right mt-4">
            <a href="/informasi/panduan" className="text-sm text-secondary hover:underline">
              Lihat Semua Panduan &rarr;
            </a>
          </div>
        </section>

        {/* Kategori: Arsip Pengumuman & Event */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-warning">
          <h2 className="text-xl font-semibold mb-4 text-warning-dark flex items-center gap-2">
            <FaCalendarAlt className="w-5 h-5 text-warning" />
            Arsip Pengumuman & Event
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/informasi/arsip-pengumuman" className="flex items-center gap-2 hover:text-warning-dark hover:underline">
                <FaBullhorn className="text-sm" /> Arsip Pengumuman Perusahaan
              </a>
            </li>
            <li>
              <a href="/informasi/arsip-event" className="flex items-center gap-2 hover:text-warning-dark hover:underline">
                <FaCalendarAlt className="text-sm" /> Kalender & Arsip Event
              </a>
            </li>
          </ul>
          <div className="text-right mt-4">
            <a href="/informasi/arsip" className="text-sm text-warning hover:underline">
              Lihat Selengkapnya &rarr;
            </a>
          </div>
        </section>

        {/* Kategori: Fasilitas & Lokasi */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
            <FaMapMarkerAlt className="w-5 h-5 text-purple-500" />
            Fasilitas & Lokasi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/informasi/denah-kantor" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaMap className="text-sm" /> Denah Kantor & Area Hiburan
              </a>
            </li>
            <li>
              <a href="/informasi/akses-transportasi" className="flex items-center gap-2 hover:text-purple-700 hover:underline">
                <FaBus className="text-sm" /> Akses & Transportasi
              </a>
            </li>
          </ul>
          <div className="text-right mt-4">
            <a href="/informasi/fasilitas" className="text-sm text-purple-500 hover:underline">
              Lihat Selengkapnya &rarr;
            </a>
          </div>
        </section>

        {/* Kategori: Formulir & Dokumen Penting (Tambahan) */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
            <FaEnvelopeOpenText className="w-5 h-5 text-blue-500" />
            Formulir & Dokumen Penting
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/informasi/formulir-pengajuan" className="flex items-center gap-2 hover:text-blue-700 hover:underline">
                <FaBook className="text-sm" /> Formulir Pengajuan (Cuti, Reimburse, dll.)
              </a>
            </li>
            <li>
              <a href="/informasi/data-karyawan" className="flex items-center gap-2 hover:text-blue-700 hover:underline">
                <FaUsers className="text-sm" /> Pembaruan Data Karyawan
              </a>
            </li>
          </ul>
          <div className="text-right mt-4">
            <a href="/informasi/formulir" className="text-sm text-blue-500 hover:underline">
              Lihat Selengkapnya &rarr;
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default InformationPage;