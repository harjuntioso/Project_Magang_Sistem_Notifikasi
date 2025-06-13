import React, { useState } from 'react';
import {
  FaClipboardList,   // Ikon utama
  FaExclamationTriangle, // Kerusakan
  FaTools,           // Perbaikan
  FaSearch,          // Cari
  FaFilter,          // Filter
  FaPlusCircle,      // Lapor baru
  FaCheckCircle,     // Selesai
  FaClock,           // Menunggu
  FaEye,             // Lihat Detail
} from 'react-icons/fa';

const DamageRepairReportPage = () => {
  const [reports, setReports] = useState([
    // Data dummy laporan kerusakan/perbaikan
    { id: 'DR001', attraction: 'Rumah Hantu Misteri', issue: 'Sensor keamanan tidak responsif', reportedBy: 'Petugas Keamanan Dedi', reportedDate: '2025-06-10', status: 'In Progress', assignedTo: 'Tim Perbaikan Mekanik', lastUpdate: '2025-06-11' },
    { id: 'DR002', attraction: 'Area Permainan Air', issue: 'Pompa air utama bocor', reportedBy: 'Supervisor Operasional', reportedDate: '2025-06-08', status: 'Completed', assignedTo: 'Teknisi Air John', lastUpdate: '2025-06-09' },
    { id: 'DR003', attraction: 'Roller Coaster Fantasi', issue: 'Suara aneh dari mesin penggerak', reportedBy: 'Teknisi Wahana Bayu', reportedDate: '2025-06-05', status: 'Pending Approval', assignedTo: 'Manajer Teknis', lastUpdate: '2025-06-05' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAttraction, setFilterAttraction] = useState('All');

  const filteredReports = reports.filter(report =>
    (filterStatus === 'All' || report.status === filterStatus) &&
    (filterAttraction === 'All' || report.attraction === filterAttraction) &&
    (report.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-200 text-green-800';
      case 'In Progress': return 'bg-blue-200 text-blue-800';
      case 'Pending Approval': return 'bg-orange-200 text-orange-800';
      case 'Reported': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-3">
        <FaClipboardList className="w-8 h-8 text-blue-500" />
        Laporan Kerusakan & Perbaikan
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Catat, pantau, dan kelola semua laporan kerusakan serta riwayat perbaikan fasilitas dan wahana.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-blue-500" />
          Filter Laporan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-report" className="block text-gray-700 font-medium mb-1">Cari Laporan</label>
            <input
              type="text"
              id="search-report"
              placeholder="Masalah, Pelapor, Ditugaskan..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status Laporan</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua Status</option>
              <option value="Reported">Dilaporkan</option>
              <option value="Pending Approval">Menunggu Persetujuan</option>
              <option value="In Progress">Sedang Dikerjakan</option>
              <option value="Completed">Selesai</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-attraction" className="block text-gray-700 font-medium mb-1">Wahana/Fasilitas</label>
            <select
              id="filter-attraction"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={filterAttraction}
              onChange={(e) => setFilterAttraction(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="Roller Coaster Fantasi">Roller Coaster Fantasi</option>
              <option value="Rumah Hantu Misteri">Rumah Hantu Misteri</option>
              <option value="Area Permainan Air">Area Permainan Air</option>
              {/* Tambahkan wahana/fasilitas lain */}
            </select>
          </div>
          <a href="/management/operasional/pemeliharaan/lapor-kerusakan/buat" className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaExclamationTriangle className="w-4 h-4" /> Lapor Baru
          </a>
        </div>
      </section>

      {/* Tabel Laporan Kerusakan */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-accent" />
          Daftar Laporan Kerusakan ({filteredReports.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Wahana/Fasilitas</th>
                <th className="py-3 px-6 text-left">Masalah</th>
                <th className="py-3 px-6 text-left">Dilaporkan Oleh</th>
                <th className="py-3 px-6 text-left">Tanggal Lapor</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Ditugaskan Kepada</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{report.attraction}</td>
                    <td className="py-3 px-6 text-left max-w-xs overflow-hidden text-ellipsis">{report.issue}</td>
                    <td className="py-3 px-6 text-left">{report.reportedBy}</td>
                    <td className="py-3 px-6 text-left">{report.reportedDate}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{report.assignedTo}</td>
                    <td className="py-3 px-6 text-center">
                      <a href={`/management/operasional/pemeliharaan/laporan-kerusakan/detail/${report.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                        <FaEye />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada laporan kerusakan ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DamageRepairReportPage;