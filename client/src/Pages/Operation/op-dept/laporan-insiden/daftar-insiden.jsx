import React, { useState } from 'react';
import {
  FaBell,            // Ikon utama untuk insiden
  FaSearch,          // Cari
  FaFilter,          // Filter
  FaEye,             // Lihat Detail
  FaUserEdit,        // Tugaskan
  FaCheckCircle,     // Selesai
  FaClock,           // Menunggu
  FaExclamationTriangle, // Prioritas/Dampak
  FaPlusCircle,
  FaFileDownload,
  FaClipboardList,
  FaHistory
} from 'react-icons/fa';

const OpenIncidentListPage = () => {
  const [incidents, setIncidents] = useState([
    // Data dummy insiden terbuka
    { id: 'INC001', title: 'Pengunjung Terjatuh di Wahana A', type: 'Kecelakaan Pengunjung', location: 'Wahana Utama', reportedBy: 'Supervisor Operasional', reportedDate: '2025-06-11', status: 'In Progress', assignedTo: 'Tim Medis & Keamanan', impact: 'Moderate' },
    { id: 'INC002', title: 'Kerusakan Mekanis Wahana B', type: 'Kerusakan Fasilitas Mayor', location: 'Wahana Anak', reportedBy: 'Petugas Wahana Andi', reportedDate: '2025-06-10', status: 'Pending Investigation', assignedTo: 'Manajer Teknis', impact: 'Major' },
    { id: 'INC003', title: 'Kehilangan Barang Pengunjung', type: 'Insiden Keamanan', location: 'Loket Tiket', reportedBy: 'Petugas Loket Budi', reportedDate: '2025-06-09', status: 'Open', assignedTo: 'Tim Keamanan', impact: 'Minor' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('Open'); // Default: hanya yang terbuka
  const [filterImpact, setFilterImpact] = useState('All');

  const filteredIncidents = incidents.filter(incident =>
    (incident.status === filterStatus || filterStatus === 'All') &&
    (filterType === 'All' || incident.type === filterType) &&
    (filterImpact === 'All' || incident.impact === filterImpact) &&
    (incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     incident.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
     incident.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-orange-200 text-orange-800';
      case 'In Progress': return 'bg-blue-200 text-blue-800';
      case 'Pending Investigation': return 'bg-yellow-200 text-yellow-800';
      case 'Completed': return 'bg-green-200 text-green-800'; // Meskipun di page ini hanya terbuka
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Critical': return 'text-red-600';
      case 'Major': return 'text-red-500';
      case 'Moderate': return 'text-orange-500';
      case 'Minor': return 'text-green-500';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700 mb-8 flex items-center gap-3">
        <FaBell className="w-8 h-8 text-red-500" />
        Daftar Insiden Terbuka
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola dan pantau semua laporan insiden yang sedang dalam proses penanganan.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-red-500">
        <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-red-500" />
          Filter Insiden
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="search-incident" className="block text-gray-700 font-medium mb-1">Cari Insiden</label>
            <input
              type="text"
              id="search-incident"
              placeholder="Judul, Lokasi, Pelapor..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-type" className="block text-gray-700 font-medium mb-1">Jenis Insiden</label>
            <select
              id="filter-type"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">Semua Jenis</option>
              <option value="Kecelakaan Pengunjung">Kecelakaan Pengunjung</option>
              <option value="Kerusakan Fasilitas Mayor">Kerusakan Fasilitas Mayor</option>
              <option value="Insiden Keamanan">Insiden Keamanan</option>
              <option value="Keluhan Serius">Keluhan Serius</option>
              <option value="Medis">Insiden Medis</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Open">Terbuka</option>
              <option value="In Progress">Sedang Dikerjakan</option>
              <option value="Pending Investigation">Menunggu Investigasi</option>
              <option value="All">Semua Status</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-impact" className="block text-gray-700 font-medium mb-1">Dampak</label>
            <select
              id="filter-impact"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              value={filterImpact}
              onChange={(e) => setFilterImpact(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="Minor">Minor</option>
              <option value="Moderate">Moderate</option>
              <option value="Major">Major</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div className="md:col-span-1 flex flex-col sm:flex-row gap-2">
            <a href="/management/operasional/insiden/buat" className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaPlusCircle className="w-4 h-4" /> Lapor Baru
            </a>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaFileDownload className="w-4 h-4" /> Unduh Data
            </button>
          </div>
        </div>
      </section>

      {/* Tabel Daftar Insiden */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Insiden Terbuka ({filteredIncidents.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Judul Insiden</th>
                <th className="py-3 px-6 text-left">Jenis</th>
                <th className="py-3 px-6 text-left">Lokasi</th>
                <th className="py-3 px-6 text-left">Pelapor</th>
                <th className="py-3 px-6 text-left">Tgl. Lapor</th>
                <th className="py-3 px-6 text-left">Dampak</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Ditugaskan Kepada</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredIncidents.length > 0 ? (
                filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left font-medium">{incident.id}</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">{incident.title}</td>
                    <td className="py-3 px-6 text-left">{incident.type}</td>
                    <td className="py-3 px-6 text-left">{incident.location}</td>
                    <td className="py-3 px-6 text-left">{incident.reportedBy}</td>
                    <td className="py-3 px-6 text-left">{incident.reportedDate}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`font-semibold ${getImpactColor(incident.impact)}`}>
                        {incident.impact}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{incident.assignedTo || '-'}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <a href={`/management/operasional/insiden/detail/${incident.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                          <FaEye />
                        </a>
                        <button className="text-purple-500 hover:text-purple-700 text-lg" title="Tugaskan/Ubah Status">
                          <FaUserEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="py-4 text-center text-gray-500">Tidak ada insiden terbuka ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Riwayat Insiden (opsional) */}
      <section className="bg-white rounded-xl shadow-md p-6 mt-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaHistory className="w-5 h-5 text-info" />
          Riwayat Insiden Selesai
        </h2>
        <p className="text-gray-500">Lihat semua insiden yang telah diselesaikan.</p>
        <div className="text-right mt-4">
          <a href="/management/operasional/insiden/riwayat" className="text-sm text-info hover:underline">
            Lihat Riwayat Lengkap &rarr;
          </a>
        </div>
      </section>
    </div>
  );
};

export default OpenIncidentListPage;