import React from 'react';
import {
  FaHistory,
  FaChartBar,
  FaEnvelopeOpenText,
  FaQuestionCircle,
  FaBullhorn,
  FaBook, // Umum untuk panduan
  FaFilePdf, // Dokumen PDF
  FaPlayCircle, // Video tutorial
  FaCalendarAlt,
  FaClipboardList,
  FaHeadse,
  FaFileAlt,
  FaBriefcase,
  FaStar,
  FaUsers,
  FaLaptopCode,
  FaHeadset
} from 'react-icons/fa';

const PanduanPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-secondary-dark mb-8 flex items-center gap-3">
        <FaBook className="w-8 h-8 text-secondary" />
        Panduan & Sumber Daya
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Akses berbagai panduan, template, dan materi pelatihan untuk mendukung produktivitas kerja Anda.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Panduan Penggunaan Sistem Internal */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
          <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
            <FaChartBar className="w-5 h-5 text-secondary" />
            Panduan Penggunaan Sistem Internal
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/informasi/panduan-sistem/absensi-online" className="flex items-center gap-2 hover:text-secondary-dark hover:underline"><FaCalendarAlt className="text-sm" /> Panduan Absensi Online</a></li>
            <li><a href="/informasi/panduan-sistem/manajemen-proyek" className="flex items-center gap-2 hover:text-secondary-dark hover:underline"><FaClipboardList className="text-sm" /> Tutorial Sistem Manajemen Proyek</a></li>
            <li><a href="/informasi/panduan-sistem/helpdesk" className="flex items-center gap-2 hover:text-secondary-dark hover:underline"><FaHeadset className="text-sm" /> Cara Mengajukan Tiket Helpdesk</a></li>
            <li><a href="/informasi/panduan-sistem/video-tutorial" className="flex items-center gap-2 hover:text-secondary-dark hover:underline"><FaPlayCircle className="text-sm" /> Video Tutorial Umum</a></li>
          </ul>
        </section>

        {/* Card: Template Dokumen Resmi */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
          <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
            <FaEnvelopeOpenText className="w-5 h-5 text-info" />
            Template Dokumen Resmi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/informasi/template-dokumen/memo" className="flex items-center gap-2 hover:text-info-dark hover:underline"><FaFileAlt className="text-sm" /> Template Memo Internal</a></li>
            <li><a href="/informasi/template-dokumen/laporan" className="flex items-center gap-2 hover:text-info-dark hover:underline"><FaChartBar className="text-sm" /> Template Laporan Proyek</a></li>
            <li><a href="/informasi/template-dokumen/surat-tugas" className="flex items-center gap-2 hover:text-info-dark hover:underline"><FaBriefcase className="text-sm" /> Template Surat Tugas</a></li>
            <li><a href="/informasi/template-dokumen/brand-kit" className="flex items-center gap-2 hover:text-info-dark hover:underline"><FaStar className="text-sm" /> Brand Kit & Pedoman Visual</a></li>
          </ul>
        </section>

        {/* Card: FAQ (Pertanyaan Sering Diajukan) */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaQuestionCircle className="w-5 h-5 text-primary" />
            FAQ (Pertanyaan Sering Diajukan)
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/informasi/faq/hrd" className="flex items-center gap-2 hover:text-primary-dark hover:underline"><FaUsers className="text-sm" /> Seputar HRD & Karyawan</a></li>
            <li><a href="/informasi/faq/it" className="flex items-center gap-2 hover:text-primary-dark hover:underline"><FaHeadset className="text-sm" /> Seputar IT & Sistem</a></li>
            <li><a href="/informasi/faq/umum" className="flex items-center gap-2 hover:text-primary-dark hover:underline"><FaBook className="text-sm" /> Pertanyaan Umum Lainnya</a></li>
          </ul>
        </section>

        {/* Card: Materi Pelatihan & Pengembangan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-warning">
          <h2 className="text-xl font-semibold mb-4 text-warning-dark flex items-center gap-2">
            <FaBullhorn className="w-5 h-5 text-warning" />
            Materi Pelatihan & Pengembangan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/informasi/pelatihan/modul-baru" className="flex items-center gap-2 hover:text-warning-dark hover:underline"><FaFilePdf className="text-sm" /> Modul Pelatihan Keamanan Data</a></li>
            <li><a href="/informasi/pelatihan/jadwal" className="flex items-center gap-2 hover:text-warning-dark hover:underline"><FaCalendarAlt className="text-sm" /> Jadwal Workshop Mendatang</a></li>
            <li><a href="/informasi/pelatihan/e-learning" className="flex items-center gap-2 hover:text-warning-dark hover:underline"><FaLaptopCode className="text-sm" /> Akses Platform E-learning</a></li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default PanduanPage;