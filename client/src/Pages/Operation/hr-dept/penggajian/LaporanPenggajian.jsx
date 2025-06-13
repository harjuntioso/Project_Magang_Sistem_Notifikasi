import React, { useState } from 'react';
import {
  FaChartBar,       // Ikon utama untuk laporan
  FaMoneyBillWave,  // Gaji
  FaFileDownload,   // Unduh
  FaSearch,         // Cari/Filter
  FaUsers,          // Karyawan
  FaCalendarAlt,    // Bulan/Tahun
  FaFilePdf,        // Unduh PDF
  FaFileExcel,      // Unduh Excel
  FaFilter
} from 'react-icons/fa';

const LaporanPenggajianPage = () => {
  const [filterBulan, setFilterBulan] = useState(new Date().getMonth() + 1); // Bulan saat ini
  const [filterTahun, setFilterTahun] = useState(new Date().getFullYear());  // Tahun saat ini
  const [filterDepartemen, setFilterDepartemen] = useState('Semua');

  const [laporanGaji, setLaporanGaji] = useState([
    // Data dummy laporan gaji
    { id: 1, nama: 'Budi Santoso', departemen: 'Operasional', gajiPokok: 5000000, tunjangan: 1000000, potongan: 500000, gajiBersih: 5500000 },
    { id: 2, nama: 'Siti Nurhayati', departemen: 'HRD', gajiPokok: 4500000, tunjangan: 800000, potongan: 400000, gajiBersih: 4900000 },
    { id: 3, nama: 'Joko Widodo', departemen: 'Keuangan', gajiPokok: 6000000, tunjangan: 1200000, potongan: 600000, gajiBersih: 6600000 },
    { id: 4, nama: 'Ayu Lestari', departemen: 'Pemasaran', gajiPokok: 4800000, tunjangan: 900000, potongan: 450000, gajiBersih: 5250000 },
    // ... tambahkan lebih banyak data dummy
  ]);

  const handleApplyFilter = () => {
    alert(`Menerapkan filter untuk bulan ${filterBulan}/${filterTahun}, Departemen: ${filterDepartemen}`);
    // Logika untuk memuat data laporan dari API berdasarkan filter
  };

  const handleDownloadReport = (format) => {
    alert(`Mengunduh laporan dalam format ${format}...`);
    // Logika untuk mengunduh laporan (misalnya, membuat CSV/PDF dari data)
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-secondary-dark mb-8 flex items-center gap-3">
        <FaChartBar className="w-8 h-8 text-secondary" />
        Laporan Penggajian
      </h1>

      {/* Deskripsi Halaman */}
      <p className="text-gray-600 mb-10 text-lg">
        Lihat detail laporan penggajian bulanan, termasuk gaji pokok, tunjangan, potongan, dan gaji bersih.
      </p>

      {/* Filter Laporan */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-secondary">
        <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-secondary" />
          Filter Laporan Penggajian
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="filter-bulan" className="block text-gray-700 font-medium mb-1">Bulan</label>
            <select
              id="filter-bulan"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={filterBulan}
              onChange={(e) => setFilterBulan(parseInt(e.target.value))}
            >
              {[...Array(12).keys()].map(i => (
                <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('id-ID', { month: 'long' })}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-tahun" className="block text-gray-700 font-medium mb-1">Tahun</label>
            <input
              type="number"
              id="filter-tahun"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={filterTahun}
              onChange={(e) => setFilterTahun(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="filter-departemen" className="block text-gray-700 font-medium mb-1">Departemen</label>
            <select
              id="filter-departemen"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={filterDepartemen}
              onChange={(e) => setFilterDepartemen(e.target.value)}
            >
              <option value="Semua">Semua Departemen</option>
              <option value="Operasional">Operasional</option>
              <option value="HRD">HRD</option>
              <option value="Keuangan">Keuangan</option>
              <option value="Pemasaran">Pemasaran</option>
              <option value="IT">IT</option>
              <option value="Umum">Umum & Administrasi</option>
            </select>
          </div>
          <button
            onClick={handleApplyFilter}
            className="px-6 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary-dark transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaSearch className="w-4 h-4" /> Terapkan Filter
          </button>
        </div>
      </section>

      {/* Tabel Laporan Penggajian */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary-dark flex items-center gap-2">
            <FaUsers className="w-5 h-5 text-primary" />
            Laporan Gaji Karyawan
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => handleDownloadReport('PDF')}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center gap-2 text-sm"
            >
              <FaFilePdf className="w-4 h-4" /> Unduh PDF
            </button>
            <button
              onClick={() => handleDownloadReport('Excel')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center gap-2 text-sm"
            >
              <FaFileExcel className="w-4 h-4" /> Unduh Excel
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama</th>
                <th className="py-3 px-6 text-left">Departemen</th>
                <th className="py-3 px-6 text-right">Gaji Pokok</th>
                <th className="py-3 px-6 text-right">Tunjangan</th>
                <th className="py-3 px-6 text-right">Potongan</th>
                <th className="py-3 px-6 text-right">Gaji Bersih</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {laporanGaji.length > 0 ? (
                laporanGaji.map((data) => (
                  <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{data.nama}</td>
                    <td className="py-3 px-6 text-left">{data.departemen}</td>
                    <td className="py-3 px-6 text-right">{formatRupiah(data.gajiPokok)}</td>
                    <td className="py-3 px-6 text-right">{formatRupiah(data.tunjangan)}</td>
                    <td className="py-3 px-6 text-right">{formatRupiah(data.potongan)}</td>
                    <td className="py-3 px-6 text-right font-semibold text-green-700">{formatRupiah(data.gajiBersih)}</td>
                    <td className="py-3 px-6 text-center">
                      <button className="text-blue-500 hover:text-blue-700 text-sm">Detail</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada data laporan gaji untuk filter ini.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default LaporanPenggajianPage;