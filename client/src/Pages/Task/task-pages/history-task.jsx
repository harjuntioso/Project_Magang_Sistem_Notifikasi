import React, { useState } from 'react';
import {
  FaHistory,         // Ikon utama
  FaSearch,          // Cari
  FaFilter,          // Filter
  FaEye,             // Lihat Detail
  FaClipboardList,   // Daftar tugas
  FaCalendarAlt,     // Filter Tanggal
  FaTag,             // Filter Kategori
  FaFileDownload,    // Unduh Laporan
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt
} from 'react-icons/fa';

const TaskHistoryPage = () => {
  const [allTasks, setAllTasks] = useState([
    // Data dummy semua tugas (baik yang selesai maupun yang tidak)
    { id: 'TASK001', title: 'Permintaan Desain Poster Event', requester: 'Nama Officer A', deptRequester: 'Pemasaran', deptTo: 'Desain', status: 'Ditolak Atasan', submittedAt: '2025-06-10', completedAt: null },
    { id: 'TASK002', title: 'Permintaan Data Absensi Karyawan', requester: 'Nama Officer B', deptRequester: 'Operasional', deptTo: 'HRD', status: 'Diterima & Sedang Dikerjakan', submittedAt: '2025-06-09', completedAt: null },
    { id: 'TASK003', title: 'Instalasi Software Desain Grafis', requester: 'Nama Officer C', deptRequester: 'Pemasaran', deptTo: 'IT', status: 'Menunggu Proses di Penerima', submittedAt: '2025-06-11', completedAt: null },
    { id: 'TASK004', title: 'Update Data Karyawan Baru', requester: 'Nama Officer D', deptRequester: 'IT', deptTo: 'HRD', status: 'Selesai', submittedAt: '2025-06-05', completedAt: '2025-06-07' },
    { id: 'TASK005', title: 'Perbaikan Komputer Ruangan IT', requester: 'Nama Officer E', deptRequester: 'Operasional', deptTo: 'IT', status: 'Selesai', submittedAt: '2025-06-01', completedAt: '2025-06-03' },
    { id: 'TASK006', title: 'Permintaan Analisis Pasar Q2', requester: 'Nama Officer F', deptRequester: 'Keuangan', deptTo: 'Pemasaran', status: 'Pengajuan Revisi', submittedAt: '2025-05-28', completedAt: null },
    { id: 'TASK007', title: 'Pengadaan Meja Kantor Baru', requester: 'Nama Officer G', deptRequester: 'HRD', deptTo: 'Umum & Administrasi', status: 'Ditolak Penerima', submittedAt: '2025-05-20', completedAt: null },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // All, Selesai, Ditolak, dll.
  const [filterRequesterDept, setFilterRequesterDept] = useState('All');
  const [filterDeptTo, setFilterDeptTo] = useState('All');

  const filteredTasks = allTasks.filter(task =>
    (filterStatus === 'All' || task.status === filterStatus) &&
    (filterRequesterDept === 'All' || task.deptRequester === filterRequesterDept) &&
    (filterDeptTo === 'All' || task.deptTo === filterDeptTo) &&
    (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     task.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
     task.deptTo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Menunggu Persetujuan Atasan': return 'bg-purple-200 text-purple-800';
      case 'Menunggu Proses di Penerima': return 'bg-orange-200 text-orange-800';
      case 'Diterima & Sedang Dikerjakan': return 'bg-blue-200 text-blue-800';
      case 'Selesai': return 'bg-green-200 text-green-800';
      case 'Ditolak Penerima': return 'bg-red-200 text-red-800';
      case 'Ditolak Atasan': return 'bg-red-200 text-red-800';
      case 'Pengajuan Revisi': return 'bg-yellow-200 text-yellow-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const handleDownloadReport = () => {
    alert('Mengunduh laporan riwayat tugas...');
    // Logika untuk mengunduh laporan (misalnya, CSV/Excel)
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-8 flex items-center gap-3">
        <FaHistory className="w-8 h-8 text-gray-500" />
        Riwayat Tugas Antar Departemen
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Telusuri riwayat lengkap semua pengajuan tugas antar departemen, termasuk status penyelesaiannya.
      </p>

      {/* Filter Riwayat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-gray-500">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-gray-500" />
          Filter Riwayat Tugas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="search-history" className="block text-gray-700 font-medium mb-1">Cari Tugas</label>
            <input
              type="text"
              id="search-history"
              placeholder="Judul, Pemohon, Detail..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua Status</option>
              <option value="Menunggu Persetujuan Atasan">Menunggu Persetujuan Atasan</option>
              <option value="Menunggu Proses di Penerima">Menunggu Proses</option>
              <option value="Diterima & Sedang Dikerjakan">Sedang Dikerjakan</option>
              <option value="Pengajuan Revisi">Pengajuan Revisi</option>
              <option value="Selesai">Selesai</option>
              <option value="Ditolak Penerima">Ditolak Penerima</option>
              <option value="Ditolak Atasan">Ditolak Atasan</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-req-dept" className="block text-gray-700 font-medium mb-1">Dari Departemen</label>
            <select
              id="filter-req-dept"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
              value={filterRequesterDept}
              onChange={(e) => setFilterRequesterDept(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="Operasional">Operasional</option>
              <option value="HRD">HRD</option>
              <option value="Keuangan">Keuangan</option>
              <option value="IT">IT</option>
              <option value="Pemasaran">Pemasaran</option>
              <option value="Umum & Administrasi">Umum & Administrasi</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-dept-to" className="block text-gray-700 font-medium mb-1">Tujuan Departemen</label>
            <select
              id="filter-dept-to"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
              value={filterDeptTo}
              onChange={(e) => setFilterDeptTo(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="Operasional">Operasional</option>
              <option value="HRD">HRD</option>
              <option value="Keuangan">Keuangan</option>
              <option value="IT">IT</option>
              <option value="Pemasaran">Pemasaran</option>
              <option value="Umum & Administrasi">Umum & Administrasi</option>
            </select>
          </div>
          <button onClick={handleDownloadReport} className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaFileDownload className="w-4 h-4" /> Unduh Laporan
          </button>
        </div>
      </section>

      {/* Tabel Riwayat Tugas */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Riwayat Tugas ({filteredTasks.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Judul Tugas</th>
                <th className="py-3 px-6 text-left">Dari Dept.</th>
                <th className="py-3 px-6 text-left">Untuk Dept.</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Diajukan</th>
                <th className="py-3 px-6 text-left">Selesai/Tolak</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{task.title}</td>
                    <td className="py-3 px-6 text-left">{task.deptRequester}</td>
                    <td className="py-3 px-6 text-left">{task.deptTo}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                        {task.status === 'Selesai' && <FaCheckCircle className="inline-block mr-1" />}
                        {task.status === 'Ditolak Penerima' && <FaTimesCircle className="inline-block mr-1" />}
                        {task.status === 'Ditolak Atasan' && <FaTimesCircle className="inline-block mr-1" />}
                        {task.status === 'Pengajuan Revisi' && <FaSyncAlt className="inline-block mr-1" />}
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{task.submittedAt}</td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{task.completedAt || '-'}</td>
                    <td className="py-3 px-6 text-center">
                      <a href={`/task-exchange/detail/${task.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                        <FaEye />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada riwayat tugas ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TaskHistoryPage;