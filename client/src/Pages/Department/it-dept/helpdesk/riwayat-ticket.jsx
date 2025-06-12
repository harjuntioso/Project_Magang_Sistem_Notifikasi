import React, { useState } from 'react';
import {
  FaHistory,         // Ikon utama untuk riwayat
  FaCheckCircle,     // Status Selesai
  FaSearch,          // Cari
  FaFilter,          // Filter
  FaEye,             // Lihat Detail
  FaCalendarAlt,     // Filter Tanggal
  FaTag,             // Filter Kategori
} from 'react-icons/fa';

const ClosedTicketHistoryPage = () => {
  const [closedTickets, setClosedTickets] = useState([
    // Data dummy tiket selesai
    { id: 'TKT001', subject: 'Internet kantor putus di lantai 3', requester: 'Budi Santoso', category: 'Network', solution: 'Kabel jaringan diperbaiki.', closedBy: 'Andi (IT)', closedAt: '2025-06-10 12:00' },
    { id: 'TKT002', subject: 'Akses sistem HRIS error', requester: 'Siti Nurhayati', category: 'Software', solution: 'Reset password dan panduan akses.', closedBy: 'Dewi (IT)', closedAt: '2025-06-09 16:30' },
    { id: 'TKT005', subject: 'Permintaan instalasi software desain grafis', requester: 'Bayu Prakoso', category: 'Software', solution: 'Software berhasil diinstal dan dikonfigurasi.', closedBy: 'Andi (IT)', closedAt: '2025-06-07 10:00' },
    { id: 'TKT006', subject: 'Keyboard tidak berfungsi', requester: 'Indah Sari', category: 'Hardware', solution: 'Penggantian keyboard.', closedBy: 'Dewi (IT)', closedAt: '2025-06-05 14:00' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterMonth, setFilterMonth] = useState('All'); // Contoh filter bulan

  const filteredClosedTickets = closedTickets.filter(ticket =>
    (filterCategory === 'All' || ticket.category === filterCategory) &&
    (filterMonth === 'All' || new Date(ticket.closedAt).getMonth() + 1 === parseInt(filterMonth)) &&
    (ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     ticket.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
     ticket.solution.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 flex items-center gap-3">
        <FaHistory className="w-8 h-8 text-primary" />
        Riwayat Tiket Selesai
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lihat daftar semua tiket dukungan yang telah berhasil diselesaikan oleh tim IT.
      </p>

      {/* Filter Riwayat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-primary" />
          Filter Riwayat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-history" className="block text-gray-700 font-medium mb-1">Cari Riwayat</label>
            <input
              type="text"
              id="search-history"
              placeholder="Subjek, Pemohon, Solusi..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-category" className="block text-gray-700 font-medium mb-1">Kategori Masalah</label>
            <select
              id="filter-category"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">Semua Kategori</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Network">Jaringan/Internet</option>
              <option value="Account Access">Akses Akun</option>
              <option value="Printer">Printer</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-month" className="block text-gray-700 font-medium mb-1">Bulan Selesai</label>
            <select
              id="filter-month"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              <option value="All">Semua Bulan</option>
              {[...Array(12).keys()].map(i => (
                <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('id-ID', { month: 'long' })}</option>
              ))}
            </select>
          </div>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaFileDownload className="w-4 h-4" /> Unduh Riwayat
          </button>
        </div>
      </section>

      {/* Tabel Riwayat Tiket Selesai */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaCheckCircle className="w-5 h-5 text-accent" />
          Daftar Tiket Selesai ({filteredClosedTickets.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID Tiket</th>
                <th className="py-3 px-6 text-left">Subjek</th>
                <th className="py-3 px-6 text-left">Pemohon</th>
                <th className="py-3 px-6 text-left">Kategori</th>
                <th className="py-3 px-6 text-left">Solusi Ringkas</th>
                <th className="py-3 px-6 text-left">Diselesaikan Oleh</th>
                <th className="py-3 px-6 text-left">Tanggal Selesai</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredClosedTickets.length > 0 ? (
                filteredClosedTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{ticket.id}</td>
                    <td className="py-3 px-6 text-left">{ticket.subject}</td>
                    <td className="py-3 px-6 text-left">{ticket.requester}</td>
                    <td className="py-3 px-6 text-left flex items-center gap-2"><FaTag className="text-xs text-gray-500" />{ticket.category}</td>
                    <td className="py-3 px-6 text-left max-w-xs overflow-hidden text-ellipsis">{ticket.solution}</td>
                    <td className="py-3 px-6 text-left">{ticket.closedBy}</td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{ticket.closedAt}</td>
                    <td className="py-3 px-6 text-center">
                      <a href={`/management/it/helpdesk/detail/${ticket.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                        <FaEye />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">Tidak ada tiket selesai.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ClosedTicketHistoryPage;