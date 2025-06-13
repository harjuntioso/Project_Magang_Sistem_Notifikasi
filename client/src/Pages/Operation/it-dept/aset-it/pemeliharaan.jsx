import React, { useState } from 'react';
import {
  FaTools,        // Ikon utama untuk perawatan
  FaCalendarAlt,  // Jadwal
  FaHistory,      // Riwayat
  FaLaptopCode,   // Perangkat
  FaPlusCircle,   // Tambah jadwal
  FaCheckCircle,  // Selesai
  FaExclamationTriangle, // Perlu perhatian
  FaSearch,       // Cari
  FaFilter,       // Filter
} from 'react-icons/fa';

const ItMaintenanceSchedulePage = () => {
  const [maintenanceSchedule, setMaintenanceSchedule] = useState([
    // Data dummy jadwal perawatan
    { id: 'MNT001', deviceId: 'PC001', deviceName: 'Desktop PC Lantai 1', type: 'Preventive', scheduleDate: '2025-07-01', status: 'Scheduled', assignedTo: 'Andi (IT)', notes: 'Pembersihan internal, cek software.' },
    { id: 'MNT002', deviceId: 'LT005', deviceName: 'Laptop Direktur Utama', type: 'Troubleshooting', scheduleDate: '2025-06-15', status: 'Completed', assignedTo: 'Dewi (IT)', notes: 'Perbaikan bug software.' },
    { id: 'MNT003', deviceId: 'PRN002', deviceName: 'Printer Keuangan (Color)', type: 'Preventive', scheduleDate: '2025-06-20', status: 'Scheduled', assignedTo: 'Andi (IT)', notes: 'Cek toner, pembersihan head.' },
    { id: 'MNT004', deviceId: 'SRV001', deviceName: 'Server Database Utama', type: 'Scheduled Backup', scheduleDate: '2025-06-10', status: 'Completed', assignedTo: 'Tim IT', notes: 'Verifikasi backup data harian.' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Scheduled'); // Default: hanya yang terjadwal
  const [filterType, setFilterType] = useState('All');

  const filteredSchedule = maintenanceSchedule.filter(item =>
    (filterStatus === 'All' || item.status === filterStatus) &&
    (filterType === 'All' || item.type === filterType) &&
    (item.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleMarkAsCompleted = (id) => {
    if (window.confirm(`Tandai perawatan ID ${id} sebagai selesai?`)) {
      alert(`Perawatan ID ${id} ditandai sebagai selesai.`);
      // Logika untuk memperbarui status di backend
      setMaintenanceSchedule(maintenanceSchedule.map(item =>
        item.id === id ? { ...item, status: 'Completed' } : item
      ));
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-500 mb-8 flex items-center gap-3">
        <FaTools className="w-8 h-8 text-purple-500" />
        Jadwal Perawatan Perangkat IT
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lihat dan kelola jadwal perawatan rutin serta riwayat perawatan perangkat IT.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-purple-500">
        <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-purple-500" />
          Filter Jadwal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-schedule" className="block text-gray-700 font-medium mb-1">Cari Jadwal</label>
            <input
              type="text"
              id="search-schedule"
              placeholder="Nama Perangkat, Penanggung Jawab..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua Status</option>
              <option value="Scheduled">Terjadwal</option>
              <option value="Completed">Selesai</option>
              <option value="Overdue">Jatuh Tempo</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-type" className="block text-gray-700 font-medium mb-1">Jenis Perawatan</label>
            <select
              id="filter-type"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">Semua Jenis</option>
              <option value="Preventive">Preventif</option>
              <option value="Corrective">Korektif</option>
              <option value="Troubleshooting">Troubleshooting</option>
              <option value="Scheduled Backup">Backup Terjadwal</option>
            </select>
          </div>
          <a href="/management/it/aset/perawatan/tambah" className="px-6 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaPlusCircle className="w-4 h-4" /> Tambah Jadwal
          </a>
        </div>
      </section>

      {/* Tabel Jadwal Perawatan */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaCalendarAlt className="w-5 h-5 text-accent" />
          Daftar Jadwal Perawatan ({filteredSchedule.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Perangkat</th>
                <th className="py-3 px-6 text-left">Jenis Perawatan</th>
                <th className="py-3 px-6 text-left">Tgl. Terjadwal</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Penanggung Jawab</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left font-medium">{item.id}</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap flex items-center gap-2">
                      <FaLaptopCode className="text-sm" /> {item.deviceName} ({item.deviceId})
                    </td>
                    <td className="py-3 px-6 text-left">{item.type}</td>
                    <td className="py-3 px-6 text-left">{item.scheduleDate}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        item.status === 'Scheduled' ? 'bg-blue-200 text-blue-800' :
                        item.status === 'Completed' ? 'bg-green-200 text-green-800' :
                        'bg-red-200 text-red-800' // Untuk Overdue
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{item.assignedTo}</td>
                    <td className="py-3 px-6 text-center">
                      {item.status === 'Scheduled' && (
                        <button onClick={() => handleMarkAsCompleted(item.id)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors flex items-center justify-center gap-1 mx-auto">
                          <FaCheckCircle /> Selesai
                        </button>
                      )}
                      {item.status === 'Completed' && (
                        <button className="text-blue-500 hover:text-blue-700 text-sm">Detail</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada jadwal perawatan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Riwayat Perawatan (Opsional, bisa di halaman terpisah lagi) */}
      <section className="bg-white rounded-xl shadow-md p-6 mt-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaHistory className="w-5 h-5 text-info" />
          Riwayat Perawatan
        </h2>
        <p className="text-gray-500">Lihat detail riwayat perawatan yang telah dilakukan pada perangkat IT.</p>
        <div className="text-right mt-4">
          <a href="/management/it/aset/perawatan/riwayat" className="text-sm text-info hover:underline">
            Lihat Riwayat Lengkap &rarr;
          </a>
        </div>
      </section>
    </div>
  );
};

export default ItMaintenanceSchedulePage;