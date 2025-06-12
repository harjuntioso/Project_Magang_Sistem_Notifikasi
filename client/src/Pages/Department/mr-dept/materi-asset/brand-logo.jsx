import React from 'react';
import {
  FaStar,             // Ikon utama untuk brand
  FaBook,             // Pedoman
  FaFilePdf,          // Dokumen PDF
  FaDownload,         // Unduh
  FaPalette,          // Warna
  FaFont,             // Tipografi
  FaImage,            // Logo/Visual
  FaInfoCircle,       // Informasi Umum
} from 'react-icons/fa';

const BrandGuidelinesPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-yellow-700 mb-8 flex items-center gap-3">
        <FaStar className="w-8 h-8 text-yellow-500" />
        Pedoman Brand & Logo
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Panduan lengkap untuk penggunaan identitas visual dan komunikasi brand perusahaan.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Card: Pedoman Penggunaan Brand */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold mb-4 text-yellow-700 flex items-center gap-2">
            <FaBook className="w-5 h-5 text-yellow-500" />
            Pedoman Umum Penggunaan Brand
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/dokumen/brand/pedoman-brand-lengkap.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-700 hover:underline">
                <FaFilePdf className="text-sm" /> Unduh Dokumen Pedoman Lengkap (PDF)
              </a>
            </li>
            <li>
              <a href="/informasi/materi/pedoman-brand/visi-misi" className="flex items-center gap-2 hover:text-yellow-700 hover:underline">
                <FaInfoCircle className="text-sm" /> Visi, Misi, dan Nilai Perusahaan
              </a>
            </li>
            <li>
              <a href="/informasi/materi/pedoman-brand/tone-of-voice" className="flex items-center gap-2 hover:text-yellow-700 hover:underline">
                <FaClipboardList className="text-sm" /> Panduan Tone of Voice & Komunikasi
              </a>
            </li>
          </ul>
        </section>

        {/* Card: Logo & Visual Identity */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaImage className="w-5 h-5 text-primary" />
            Logo & Visual Identity
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="/informasi/materi/pedoman-brand/logo-guidelines" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaFilePdf className="text-sm" /> Panduan Penggunaan Logo (Do's & Don'ts)
              </a>
            </li>
            <li>
              <a href="/informasi/materi/pedoman-brand/palet-warna" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaPalette className="text-sm" /> Palet Warna Brand & Kode HEX/RGB
              </a>
            </li>
            <li>
              <a href="/informasi/materi/pedoman-brand/tipografi" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaFont className="text-sm" /> Pedoman Tipografi & Font
              </a>
            </li>
          </ul>
        </section>

      </div>

      {/* Bagian Unduh Brand Kit */}
      <section className="bg-white rounded-xl shadow-md p-6 mt-8 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
          <FaDownload className="w-5 h-5 text-blue-500" />
          Unduh Brand Kit Lengkap
        </h2>
        <p className="text-gray-600 mb-4">
          Unduh semua aset logo, font, template, dan pedoman dalam satu paket file ZIP.
        </p>
        <div className="text-center">
          <a href="/dokumen/brand/brand_kit_perusahaan.zip" download className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg flex items-center justify-center gap-3 mx-auto max-w-sm">
            <FaDownload className="w-6 h-6" /> Unduh Brand Kit (.zip)
          </a>
        </div>
      </section>
    </div>
  );
};

export default BrandGuidelinesPage;