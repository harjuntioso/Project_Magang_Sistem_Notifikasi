import React, { useState } from 'react';
import {
  FaBell,            // Ikon utama untuk tiket
  FaSearch,          // Cari
  FaFilter,          // Filter
  FaEye,             // Lihat Detail
  FaUserEdit,        // Assign
  FaExclamationTriangle, // Prioritas Tinggi
  FaClock,           // Status Menunggu
  FaCheckCircle,     // Status Selesai (jika ada di filter)
  FaPlusCircle,
  FaClipboardList,
} from 'react-icons/fa';

const OpenSupportTicketsPage = () => {
  const [tickets, setTickets] = useState([
    // Data dummy tiket terbuka
    { id: 'TKT001', subject: 'Internet kantor putus di lantai 3', requester: 'Budi Santoso', department: 'Operasional', priority: 'High', status: 'Open', assignedTo: 'Andi (IT)', lastUpdate: '2025-06-10 10:30', createdAt: '2025-06-10 09:00' },
    { id: 'TKT002', subject: 'Akses sistem HRIS error', requester: 'Siti Nurhayati', department: 'HRD', priority: 'Medium', status: 'Open', assignedTo: 'Dewi (IT)', lastUpdate: '2025-06-09 15:00', createdAt: '2025-06-09 14:00' },
    { id: 'TKT003', subject: 'Printer di ruang Keuangan tidak berfungsi', requester: 'Joko Widodo', department: 'Keuangan', priority: 'Low', status: 'Open', assignedTo: 'Belum Ditugaskan', lastUpdate: '2025-06-10 08:45', createdAt: '2025-06-10 08:00' },
    { id: 'TKT004', subject: 'Permintaan instalasi software baru', requester: 'Ayu Lestari', department: 'Pemasaran', priority: 'Medium', status: 'Open', assignedTo: 'Belum Ditugaskan', lastUpdate: '2025-06-08 11:00', createdAt: '2025-06-08 10:00' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('Open'); // Default hanya tampilkan yang 'Open'
  const [filterAssignedTo, setFilterAssignedTo] = useState('All');

  const filteredTickets = tickets.filter(ticket =>
    ticket.status === filterStatus &&
    (filterPriority === 'All' || ticket.priority === filterPriority) &&
    (filterAssignedTo === 'All' || ticket.assignedTo === filterAssignedTo) &&
    (ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     ticket.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
     ticket.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-200 text-red-800';
      case 'Medium': return 'bg-orange-200 text-orange-800';
      case 'Low': return 'bg-green-200 text-green-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-info-dark mb-8 flex items-center gap-3">
        <FaBell className="w-8 h-8 text-info" />
        Tiket Dukungan Terbuka
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola dan pantau semua tiket dukungan yang membutuhkan perhatian dan penyelesaian.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-info" />
          Filter Tiket
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-ticket" className="block text-gray-700 font-medium mb-1">Cari Tiket</label>
            <input
              type="text"
              id="search-ticket"
              placeholder="Subjek, Pemohon, Departemen..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-priority" className="block text-gray-700 font-medium mb-1">Prioritas</label>
            <select
              id="filter-priority"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="High">Tinggi</option>
              <option value="Medium">Sedang</option>
              <option value="Low">Rendah</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-assigned" className="block text-gray-700 font-medium mb-1">Ditugaskan Kepada</label>
            <select
              id="filter-assigned"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterAssignedTo}
              onChange={(e) => setFilterAssignedTo(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="Belum Ditugaskan">Belum Ditugaskan</option>
              <option value="Andi (IT)">Andi (IT)</option>
              <option value="Dewi (IT)">Dewi (IT)</option>
              {/* Tambahkan nama tim IT lainnya */}
            </select>
          </div>
          <a href="/management/it/helpdesk/buat" className="px-6 py-2 bg-info text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaPlusCircle className="w-4 h-4" /> Buat Tiket Baru
          </a>
        </div>
      </section>

      {/* Tabel Daftar Tiket Terbuka */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Tiket ({filteredTickets.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID Tiket</th>
                <th className="py-3 px-6 text-left">Subjek</th>
                <th className="py-3 px-6 text-left">Pemohon</th>
                <th className="py-3 px-6 text-left">Departemen</th>
                <th className="py-3 px-6 text-left">Prioritas</th>
                <th className="py-3 px-6 text-left">Ditugaskan Kepada</th>
                <th className="py-3 px-6 text-left">Terakhir Diperbarui</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{ticket.id}</td>
                    <td className="py-3 px-6 text-left">{ticket.subject}</td>
                    <td className="py-3 px-6 text-left">{ticket.requester}</td>
                    <td className="py-3 px-6 text-left">{ticket.department}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {ticket.assignedTo === 'Belum Ditugaskan' ? (
                        <span className="text-gray-500 italic">Belum Ditugaskan</span>
                      ) : (
                        ticket.assignedTo
                      )}
                    </td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{ticket.lastUpdate}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <a href={`/management/it/helpdesk/detail/${ticket.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                          <FaEye />
                        </a>
                        <button className="text-purple-500 hover:text-purple-700 text-lg" title="Tugaskan/Ubah Assignee">
                          <FaUserEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">Tidak ada tiket terbuka.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default OpenSupportTicketsPage;