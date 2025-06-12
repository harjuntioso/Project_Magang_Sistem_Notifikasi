import React from 'react';
import {
  FaEnvelopeOpenText,
  FaBook,
  FaUsers,
  FaFilePdf, // Dokumen PDF
  FaFileWord, // Dokumen Word
  FaFileExcel, // Dokumen Excel
  FaCloudDownloadAlt, // Unduh
  FaMoneyBillWave,
} from 'react-icons/fa';

const FormulirPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-3">
        <FaEnvelopeOpenText className="w-8 h-8 text-blue-500" />
        Formulir & Dokumen Penting
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Unduh formulir dan akses dokumen penting untuk berbagai keperluan administrasi.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Formulir Pengajuan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
            <FaBook className="w-5 h-5 text-blue-500" />
            Formulir Pengajuan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/dokumen/form-cuti.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-700 hover:underline"><FaFilePdf className="text-sm" /> Formulir Pengajuan Cuti</a></li>
            <li><a href="/dokumen/form-reimburse.docx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-700 hover:underline"><FaFileWord className="text-sm" /> Formulir Pengajuan Reimburse</a></li>
            <li><a href="/dokumen/form-izin-kunjungan.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-700 hover:underline"><FaFilePdf className="text-sm" /> Formulir Izin Kunjungan Dinas</a></li>
            <li><a href="/dokumen/form-pengadaan-barang.xlsx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-700 hover:underline"><FaFileExcel className="text-sm" /> Formulir Pengadaan Barang</a></li>
          </ul>
        </section>

        {/* Card: Dokumen HRD */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaUsers className="w-5 h-5 text-primary" />
            Dokumen Human Resources
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/dokumen/peraturan-perusahaan.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-dark hover:underline"><FaFilePdf className="text-sm" /> Peraturan Perusahaan</a></li>
            <li><a href="/dokumen/standar-operasional-prosedur.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-dark hover:underline"><FaFilePdf className="text-sm" /> Standar Operasional Prosedur</a></li>
            <li><a href="/dokumen/panduan-kesehatan-keselamatan-kerja.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-dark hover:underline"><FaFilePdf className="text-sm" /> Panduan K3</a></li>
          </ul>
        </section>

        {/* Card: Dokumen Keuangan & Umum */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
          <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
            <FaMoneyBillWave className="w-5 h-5 text-secondary" />
            Dokumen Keuangan & Umum
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/dokumen/panduan-klaim-medis.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary-dark hover:underline"><FaFilePdf className="text-sm" /> Panduan Klaim Medis</a></li>
            <li><a href="/dokumen/laporan-tahunan.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary-dark hover:underline"><FaFilePdf className="text-sm" /> Laporan Tahunan Perusahaan</a></li>
            <li><a href="/dokumen/panduan-perjalanan-dinas.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary-dark hover:underline"><FaFilePdf className="text-sm" /> Panduan Perjalanan Dinas</a></li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default FormulirPage;