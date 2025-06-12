import React, { useState } from 'react';
import {
  FaTools,          // Ikon utama
  FaCalendarAlt,    // Jadwal
  FaPlusCircle,     // Tambah jadwal baru
  FaEdit,           // Edit jadwal
  FaSave,           // Simpan
  FaTimes,          // Batal
  FaCheckCircle,    // Selesai
  FaExclamationTriangle, // Perlu perhatian/Jatuh tempo
  FaSearch,         // Cari
  FaFilter,         // Filter
  FaClipboardList,  // Detail tugas
} from 'react-icons/fa';

const RoutineMaintenanceSchedulePage = () => {
  const [schedule, setSchedule] = useState([
    // Data dummy jadwal pemeliharaan
    { id: 'PM001', attraction: 'Roller Coaster Fantasi', type: 'Daily Check', date: '2025-06-11', assignedTo: 'Tim Pemeliharaan A', status: 'Completed', notes: 'Semua aman.' },
    { id: 'PM002', attraction: 'Komedi Putar Ajaib', type: 'Weekly Lubrication', date: '2025-06-14', assignedTo: 'Tim Pemeliharaan B', status: 'Scheduled', notes: 'Ganti oli bagian putar.' },
    { id: 'PM003', attraction: 'Rumah Hantu Misteri', type: 'Monthly Inspection', date: '2025-06-10', assignedTo: 'Tim Pemeliharaan C', status: 'Overdue', notes: 'Cek sensor keamanan.' },
    { id: 'PM004', attraction: 'Area Permainan Air', type: 'Bi-Weekly Filter Clean', date: '2025-06-12', assignedTo: 'Tim Pemeliharaan A', status: 'Scheduled', notes: 'Pembersihan filter air.' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');

  const filteredSchedule = schedule.filter(item =>
    (filterStatus === 'All' || item.status === filterStatus) &&
    (filterType === 'All' || item.type === filterType) &&
    (item.attraction.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-200 text-green-800';
      case 'Scheduled': return 'bg-blue-200 text-blue-800';
      case 'Overdue': return 'bg-red-200 text-red-800';
      case 'In Progress': return 'bg-orange-200 text-orange-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const handleMarkComplete = (id) => {
    if (window.confirm(`Tandai jadwal ID ${id} sebagai Selesai?`)) {
      alert(`Jadwal ID ${id} ditandai selesai.`);
      setSchedule(schedule.map(item =>
        item.id === id ? { ...item, status: 'Completed', notes: 'Selesai: ' + item.notes + ' pada ' + new Date().toLocaleDateString() } : item
      ));
      // Logika update ke backend
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 flex items-center gap-3">
        <FaTools className="w-8 h-8 text-primary" />
        Jadwal Pemeliharaan Rutin
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Rencanakan dan kelola jadwal pemeliharaan preventif untuk wahana dan fasilitas.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-primary" />
          Filter Jadwal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-schedule" className="block text-gray-700 font-medium mb-1">Cari Jadwal</label>
            <input
              type="text"
              id="search-schedule"
              placeholder="Wahana, Penanggung Jawab..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua Status</option>
              <option value="Scheduled">Terjadwal</option>
              <option value="Completed">Selesai</option>
              <option value="Overdue">Jatuh Tempo</option>
              <option value="In Progress">Sedang Berjalan</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-type" className="block text-gray-700 font-medium mb-1">Jenis Pemeliharaan</label>
            <select
              id="filter-type"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">Semua Jenis</option>
              <option value="Daily Check">Pengecekan Harian</option>
              <option value="Weekly Lubrication">Pelumasan Mingguan</option>
              <option value="Monthly Inspection">Inspeksi Bulanan</option>
              <option value="Annual Overhaul">Perbaikan Tahunan</option>
            </select>
          </div>
          <a href="/management/operasional/pemeliharaan/tambah" className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center gap-2">
            <FaPlusCircle className="w-4 h-4" /> Tambah Jadwal
          </a>
        </div>
      </section>

      {/* Tabel Jadwal Pemeliharaan */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaCalendarAlt className="w-5 h-5 text-accent" />
          Daftar Jadwal Pemeliharaan ({filteredSchedule.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Wahana/Fasilitas</th>
                <th className="py-3 px-6 text-left">Jenis Pemeliharaan</th>
                <th className="py-3 px-6 text-left">Tanggal Terjadwal</th>
                <th className="py-3 px-6 text-left">Ditugaskan Kepada</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{item.attraction}</td>
                    <td className="py-3 px-6 text-left">{item.type}</td>
                    <td className="py-3 px-6 text-left">{item.date}</td>
                    <td className="py-3 px-6 text-left">{item.assignedTo}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                        {item.status === 'Overdue' && <FaExclamationTriangle className="inline-block mr-1" />}
                        {item.status === 'Completed' && <FaCheckCircle className="inline-block mr-1" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {item.status === 'Scheduled' || item.status === 'In Progress' || item.status === 'Overdue' ? (
                        <button onClick={() => handleMarkComplete(item.id)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors flex items-center justify-center gap-1 mx-auto">
                          <FaCheckCircle /> Selesai
                        </button>
                      ) : (
                        <a href={`/management/operasional/pemeliharaan/riwayat/${item.id}`} className="text-blue-500 hover:text-blue-700 text-sm">Lihat Detail</a>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">Tidak ada jadwal pemeliharaan yang ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default RoutineMaintenanceSchedulePage;