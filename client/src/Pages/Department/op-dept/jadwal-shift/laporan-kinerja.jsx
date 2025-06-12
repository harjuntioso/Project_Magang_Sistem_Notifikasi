import React, { useState } from 'react';
import {
  FaChartBar,       // Ikon utama
  FaCalendarAlt,    // Filter tanggal
  FaUsers,          // Filter staf
  FaSearch,         // Cari
  FaFileDownload,   // Unduh
  FaChartLine,      // Grafik
  FaClock,          // Keterlambatan
  FaUserTimes,      // Absensi
  FaFilter,
  FaFilePdf,
  FaFileExcel
} from 'react-icons/fa';

const ShiftPerformanceReportPage = () => {
  const [reportData, setReportData] = useState([
    // Data dummy laporan kinerja shift
    { id: 1, staffName: 'Andi Nugroho', role: 'Petugas Wahana', totalShifts: 20, present: 18, late: 2, absent: 0, performanceScore: 90 },
    { id: 2, staffName: 'Budi Santoso', role: 'Petugas Loket', totalShifts: 22, present: 20, late: 1, absent: 1, performanceScore: 85 },
    { id: 3, staffName: 'Citra Dewi', role: 'Petugas Kebersihan', totalShifts: 18, present: 17, late: 0, absent: 1, performanceScore: 92 },
    // ... tambahkan data dummy lainnya
  ]);

  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [filterStaff, setFilterStaff] = useState('');

  const filteredReports = reportData.filter(report =>
    report.staffName.toLowerCase().includes(filterStaff.toLowerCase())
    // Di sini akan ada logika filter berdasarkan bulan/tahun jika data reportData diambil secara dinamis
  );

  const handleApplyFilter = () => {
    alert(`Menerapkan filter untuk bulan ${filterMonth}/${filterYear}, Staf: ${filterStaff}`);
    // Logika untuk memuat data laporan dari API berdasarkan filter
  };

  const handleDownloadReport = (format) => {
    alert(`Mengunduh laporan kinerja shift dalam format ${format}...`);
    // Logika untuk mengunduh laporan
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-accent-dark mb-8 flex items-center gap-3">
        <FaChartBar className="w-8 h-8 text-accent" />
        Laporan Kinerja Shift
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lihat dan analisis laporan kinerja petugas lapangan berdasarkan data kehadiran dan produktivitas shift.
      </p>

      {/* Filter Laporan */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-accent" />
          Opsi Filter Laporan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="filter-month" className="block text-gray-700 font-medium mb-1">Bulan</label>
            <select
              id="filter-month"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              {[...Array(12).keys()].map(i => (
                <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('id-ID', { month: 'long' })}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-year" className="block text-gray-700 font-medium mb-1">Tahun</label>
            <input
              type="number"
              id="filter-year"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-staff" className="block text-gray-700 font-medium mb-1">Nama Staf</label>
            <input
              type="text"
              id="filter-staff"
              placeholder="Cari nama staf..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              value={filterStaff}
              onChange={(e) => setFilterStaff(e.target.value)}
            />
          </div>
          <button
            onClick={handleApplyFilter}
            className="px-6 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaSearch className="w-4 h-4" /> Terapkan Filter
          </button>
        </div>
      </section>

      {/* Tabel Laporan Kinerja */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary-dark flex items-center gap-2">
            <FaChartBar className="w-5 h-5 text-primary" />
            Detail Kinerja Staf
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
                <th className="py-3 px-6 text-left">Nama Staf</th>
                <th className="py-3 px-6 text-left">Jabatan</th>
                <th className="py-3 px-6 text-right">Total Shift</th>
                <th className="py-3 px-6 text-right">Hadir</th>
                <th className="py-3 px-6 text-right">Terlambat</th>
                <th className="py-3 px-6 text-right">Absen</th>
                <th className="py-3 px-6 text-right">Skor Kinerja</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredReports.length > 0 ? (
                filteredReports.map((data) => (
                  <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{data.staffName}</td>
                    <td className="py-3 px-6 text-left">{data.role}</td>
                    <td className="py-3 px-6 text-right">{data.totalShifts}</td>
                    <td className="py-3 px-6 text-right text-green-600 font-semibold">{data.present}</td>
                    <td className="py-3 px-6 text-right text-orange-600 font-semibold">{data.late}</td>
                    <td className="py-3 px-6 text-right text-red-600 font-semibold">{data.absent}</td>
                    <td className="py-3 px-6 text-right">{data.performanceScore}%</td>
                    <td className="py-3 px-6 text-center">
                      <button className="text-blue-500 hover:text-blue-700 text-sm">Detail</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">Tidak ada data laporan kinerja.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ShiftPerformanceReportPage;