import React, { useState } from 'react';
import {
  FaHistory,        // Ikon utama
  FaWarehouse,      // Aset
  FaSearch,         // Cari
  FaFilter,         // Filter
  FaMapMarkerAlt,   // Lokasi
  FaCalendarAlt,    // Tanggal
  FaUser,           // Ditugaskan kepada
  FaFileDownload,   // Unduh
  FaClipboardList
} from 'react-icons/fa';

const AssetHistoryLocationPage = () => {
  const [historyData, setHistoryData] = useState([
    // Data dummy riwayat aset
    { id: 1, assetId: 'ASTN001', assetName: 'Meja Kantor Eksekutif', event: 'Penempatan Baru', detail: 'Dipindahkan ke Kantor Direktur Utama', date: '2025-01-10', by: 'Admin Umum' },
    { id: 2, assetId: 'ASTN003', assetName: 'Mesin Kopi Otomatis', event: 'Perbaikan', detail: 'Perbaikan kerusakan pompa air', date: '2025-05-01', by: 'Teknisi Eksternal' },
    { id: 3, assetId: 'ASTN002', assetName: 'Kursi Ergonomis', event: 'Perpindahan Lokasi', detail: 'Dipindahkan ke Lantai 2, area Marketing', date: '2025-06-05', by: 'Admin Umum' },
    { id: 4, assetId: 'ASTN005', assetName: 'Kulkas Pantry', event: 'Pelaporan Kerusakan', detail: 'Kerusakan pada sistem pendingin', date: '2025-06-10', by: 'Budi Santoso' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterAsset, setFilterAsset] = useState('All');
  const [filterEvent, setFilterEvent] = useState('All');

  const filteredHistory = historyData.filter(item =>
    (filterAsset === 'All' || item.assetId === filterAsset) &&
    (filterEvent === 'All' || item.event === filterEvent) &&
    (item.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.by.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDownloadHistory = () => {
    alert('Mengunduh riwayat aset...');
    // Logika untuk mengunduh data
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 flex items-center gap-3">
        <FaHistory className="w-8 h-8 text-primary" />
        Riwayat Aset & Lokasi
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Telusuri riwayat pergerakan, penugasan, dan status aset non-IT dari waktu ke waktu.
      </p>

      {/* Filter Riwayat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-primary" />
          Filter Riwayat Aset
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-history" className="block text-gray-700 font-medium mb-1">Cari Riwayat</label>
            <input
              type="text"
              id="search-history"
              placeholder="Nama Aset, Detail, Oleh..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-asset" className="block text-gray-700 font-medium mb-1">Pilih Aset</label>
            <select
              id="filter-asset"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={filterAsset}
              onChange={(e) => setFilterAsset(e.target.value)}
            >
              <option value="All">Semua Aset</option>
              <option value="ASTN001">Meja Kantor Eksekutif</option>
              <option value="ASTN003">Mesin Kopi Otomatis</option>
              {/* Tambahkan aset lain dari daftar inventaris Anda */}
            </select>
          </div>
          <div>
            <label htmlFor="filter-event" className="block text-gray-700 font-medium mb-1">Jenis Peristiwa</label>
            <select
              id="filter-event"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
            >
              <option value="All">Semua Jenis</option>
              <option value="Penempatan Baru">Penempatan Baru</option>
              <option value="Perbaikan">Perbaikan</option>
              <option value="Perpindahan Lokasi">Perpindahan Lokasi</option>
              <option value="Pelaporan Kerusakan">Pelaporan Kerusakan</option>
              {/* Tambahkan jenis peristiwa lain */}
            </select>
          </div>
          <button onClick={handleDownloadHistory} className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaFileDownload className="w-4 h-4" /> Unduh Riwayat
          </button>
        </div>
      </section>

      {/* Tabel Riwayat Aset */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-accent" />
          Detail Riwayat Aset ({filteredHistory.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama Aset</th>
                <th className="py-3 px-6 text-left">Jenis Peristiwa</th>
                <th className="py-3 px-6 text-left">Detail</th>
                <th className="py-3 px-6 text-left">Tanggal</th>
                <th className="py-3 px-6 text-left">Oleh</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{item.assetName} ({item.assetId})</td>
                    <td className="py-3 px-6 text-left">{item.event}</td>
                    <td className="py-3 px-6 text-left max-w-sm overflow-hidden text-ellipsis">{item.detail}</td>
                    <td className="py-3 px-6 text-left">{item.date}</td>
                    <td className="py-3 px-6 text-left">{item.by}</td>
                    <td className="py-3 px-6 text-center">
                      <button className="text-blue-500 hover:text-blue-700 text-sm">Lihat Detail</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">Tidak ada riwayat aset ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AssetHistoryLocationPage;