import React, { useState } from 'react';
import {
  FaClipboardList, // Icon utama untuk laporan
  FaCalendarAlt,   // Filter tanggal
  FaUsers,         // Filter karyawan
  FaSearch,        // Tombol cari/filter
  FaFileDownload,  // Unduh laporan
  FaFileAlt,       // Tipe laporan
} from 'react-icons/fa';

const AbsensiReportPage = () => {
  const [filterDateRange, setFilterDateRange] = useState('');
  const [filterKaryawan, setFilterKaryawan] = useState('');
  const [reportData, setReportData] = useState([
    // Data dummy laporan
    { id: 1, nama: 'Budi Santoso', tanggal: '2025-06-01', status: 'Hadir', jamMasuk: '08:00', jamKeluar: '17:00' },
    { id: 2, nama: 'Siti Nurhayati', tanggal: '2025-06-01', status: 'Cuti', jamMasuk: '-', jamKeluar: '-' },
    { id: 3, nama: 'Joko Widodo', tanggal: '2025-06-01', status: 'Hadir', jamMasuk: '08:10', jamKeluar: '17:05' },
    { id: 4, nama: 'Ayu Lestari', tanggal: '2025-06-01', status: 'Hadir', jamMasuk: '07:55', jamKeluar: '16:50' },
    // Tambahkan lebih banyak data dummy
  ]);

  const handleFilter = () => {
    alert(`Menerapkan filter: Rentang Tanggal: ${filterDateRange}, Karyawan: ${filterKaryawan}`);
    // Di sini Anda akan memuat data laporan dari API berdasarkan filter
  };

  const handleDownload = () => {
    alert('Mengunduh laporan...');
    // Logika untuk mengunduh file (CSV/Excel)
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-accent-dark mb-8 flex items-center gap-3">
        <FaClipboardList className="w-8 h-8 text-accent" />
        Laporan Kehadiran Karyawan
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lihat dan unduh laporan kehadiran karyawan berdasarkan kriteria yang diinginkan.
      </p>

      {/* Filter Options */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaSearch className="w-5 h-5 text-accent" />
          Opsi Filter Laporan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="date-range" className="block text-gray-700 font-medium mb-1">Rentang Tanggal</label>
            <input
              type="text" // Bisa diganti date picker
              id="date-range"
              placeholder="Contoh: 01/06/2025 - 30/06/2025"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              value={filterDateRange}
              onChange={(e) => setFilterDateRange(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="karyawan-filter" className="block text-gray-700 font-medium mb-1">Nama Karyawan</label>
            <input
              type="text"
              id="karyawan-filter"
              placeholder="Cari nama karyawan..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              value={filterKaryawan}
              onChange={(e) => setFilterKaryawan(e.target.value)}
            />
          </div>
          <button
            onClick={handleFilter}
            className="px-6 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent-dark transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaSearch className="w-4 h-4" /> Terapkan Filter
          </button>
        </div>
      </section>

      {/* Report Table */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-info-dark flex items-center gap-2">
            <FaFileAlt className="w-5 h-5 text-info" />
            Detail Laporan
          </h2>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2 text-sm"
          >
            <FaFileDownload className="w-4 h-4" /> Unduh Laporan
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama</th>
                <th className="py-3 px-6 text-left">Tanggal</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Jam Masuk</th>
                <th className="py-3 px-6 text-left">Jam Keluar</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {reportData.length > 0 ? (
                reportData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{row.nama}</td>
                    <td className="py-3 px-6 text-left">{row.tanggal}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        row.status === 'Hadir' ? 'bg-green-200 text-green-800' :
                        row.status === 'Cuti' ? 'bg-blue-200 text-blue-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{row.jamMasuk}</td>
                    <td className="py-3 px-6 text-left">{row.jamKeluar}</td>
                    <td className="py-3 px-6 text-center">
                      <button className="text-blue-500 hover:text-blue-700 text-sm">Detail</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">Tidak ada data laporan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AbsensiReportPage;