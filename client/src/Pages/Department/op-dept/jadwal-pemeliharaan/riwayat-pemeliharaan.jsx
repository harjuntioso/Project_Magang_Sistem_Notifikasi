import React, { useState } from 'react';
import {
  FaHistory,        // Ikon utama
  FaTools,          // Pemeliharaan
  FaSearch,         // Cari
  FaFilter,         // Filter
  FaClipboardList,  // Laporan
  FaCalendarAlt,    // Tanggal
  FaCheckCircle,    // Status Selesai
  FaEye,            // Lihat Detail
} from 'react-icons/fa';

const AttractionMaintenanceHistoryPage = () => {
  const [maintenanceHistory, setMaintenanceHistory] = useState([
    // Data dummy riwayat pemeliharaan
    { id: 'MH001', attraction: 'Roller Coaster Fantasi', type: 'Annual Overhaul', date: '2024-12-01', performedBy: 'Teknisi Utama Jhon', outcome: 'Berhasil, Wahana siap beroperasi penuh.', relatedReport: 'DR001' },
    { id: 'MH002', attraction: 'Komedi Putar Ajaib', type: 'Weekly Lubrication', date: '2025-06-07', performedBy: 'Tim Pemeliharaan B', outcome: 'Pelumasan rutin selesai.', relatedReport: null },
    { id: 'MH003', attraction: 'Rumah Hantu Misteri', type: 'Troubleshooting', date: '2025-06-11', performedBy: 'Tim Perbaikan Mekanik', outcome: 'Sensor keamanan diperbaiki.', relatedReport: 'DR001' },
    { id: 'MH004', attraction: 'Area Permainan Air', type: 'Bi-Weekly Filter Clean', date: '2025-05-29', performedBy: 'Tim Pemeliharaan A', outcome: 'Filter dibersihkan.', relatedReport: null },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttraction, setFilterAttraction] = useState('All');
  const [filterType, setFilterType] = useState('All');

  const filteredHistory = maintenanceHistory.filter(item =>
    (filterAttraction === 'All' || item.attraction === filterAttraction) &&
    (filterType === 'All' || item.type === filterType) &&
    (item.attraction.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.outcome.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.performedBy.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-info-dark mb-8 flex items-center gap-3">
        <FaHistory className="w-8 h-8 text-info" />
        Riwayat Pemeliharaan Atraksi
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Telusuri riwayat lengkap semua aktivitas pemeliharaan dan perbaikan untuk setiap wahana dan fasilitas.
      </p>

      {/* Filter Riwayat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-info" />
          Filter Riwayat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-history" className="block text-gray-700 font-medium mb-1">Cari Riwayat</label>
            <input
              type="text"
              id="search-history"
              placeholder="Wahana, Hasil, Pelaksana..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-attraction" className="block text-gray-700 font-medium mb-1">Wahana/Fasilitas</label>
            <select
              id="filter-attraction"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterAttraction}
              onChange={(e) => setFilterAttraction(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="Roller Coaster Fantasi">Roller Coaster Fantasi</option>
              <option value="Komedi Putar Ajaib">Komedi Putar Ajaib</option>
              <option value="Rumah Hantu Misteri">Rumah Hantu Misteri</option>
              <option value="Area Permainan Air">Area Permainan Air</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-type" className="block text-gray-700 font-medium mb-1">Jenis Perawatan</label>
            <select
              id="filter-type"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">Semua Jenis</option>
              <option value="Daily Check">Pengecekan Harian</option>
              <option value="Weekly Lubrication">Pelumasan Mingguan</option>
              <option value="Monthly Inspection">Inspeksi Bulanan</option>
              <option value="Annual Overhaul">Perbaikan Tahunan</option>
              <option value="Troubleshooting">Troubleshooting</option>
            </select>
          </div>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaFileDownload className="w-4 h-4" /> Unduh Riwayat
          </button>
        </div>
      </section>

      {/* Tabel Riwayat Pemeliharaan */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Riwayat ({filteredHistory.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Wahana/Fasilitas</th>
                <th className="py-3 px-6 text-left">Jenis Perawatan</th>
                <th className="py-3 px-6 text-left">Tanggal</th>
                <th className="py-3 px-6 text-left">Dilakukan Oleh</th>
                <th className="py-3 px-6 text-left">Hasil</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{item.attraction}</td>
                    <td className="py-3 px-6 text-left">{item.type}</td>
                    <td className="py-3 px-6 text-left">{item.date}</td>
                    <td className="py-3 px-6 text-left">{item.performedBy}</td>
                    <td className="py-3 px-6 text-left max-w-xs overflow-hidden text-ellipsis">{item.outcome}</td>
                    <td className="py-3 px-6 text-center">
                      <a href={`/management/operasional/pemeliharaan/riwayat/${item.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                        <FaEye />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">Tidak ada riwayat pemeliharaan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AttractionMaintenanceHistoryPage;