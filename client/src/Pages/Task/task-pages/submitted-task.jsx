import React, { useState } from 'react';
import {
  FaPaperPlane,      // Ikon utama
  FaSearch,          // Cari
  FaFilter,          // Filter
  FaEye,             // Lihat Detail
  FaClipboardList,   // Daftar tugas
  FaClock,           // Menunggu
  FaCheckCircle,     // Selesai
  FaTimesCircle,     // Ditolak
  FaSyncAlt,         // Revisi
  FaTimes,
} from 'react-icons/fa';

const SubmittedTasksPage = () => {
  // Data dummy tugas yang diajukan oleh user yang login
  const [myTasks, setMyTasks] = useState([
    { id: 'TASK001', title: 'Permintaan Desain Poster Event', deptTo: 'Desain', submittedAt: '2025-06-10', status: 'Menunggu Persetujuan Atasan', lastUpdate: '2025-06-10' },
    { id: 'TASK004', title: 'Update Data Karyawan Baru', deptTo: 'HRD', submittedAt: '2025-06-05', status: 'Menunggu Proses di Penerima', lastUpdate: '2025-06-11' },
    { id: 'TASK005', title: 'Perbaikan Komputer Ruangan IT', deptTo: 'IT', submittedAt: '2025-06-01', status: 'Selesai', lastUpdate: '2025-06-03' },
    { id: 'TASK006', title: 'Permintaan Analisis Pasar Q2', deptTo: 'Pemasaran', submittedAt: '2025-05-28', status: 'Pengajuan Revisi', lastUpdate: '2025-06-01', revisionNotes: 'Data kurang lengkap, mohon tambahkan sumber.' },
    { id: 'TASK007', title: 'Pengadaan Meja Kantor Baru', deptTo: 'Umum & Administrasi', submittedAt: '2025-05-20', status: 'Ditolak Penerima', lastUpdate: '2025-05-22', rejectionReason: 'Anggaran tidak tersedia untuk saat ini.' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // All, Menunggu Persetujuan Atasan, Menunggu Proses di Penerima, Selesai, Ditolak, Pengajuan Revisi
  const [filterDeptTo, setFilterDeptTo] = useState('All');

  const filteredTasks = myTasks.filter(task =>
    (filterStatus === 'All' || task.status === filterStatus) &&
    (filterDeptTo === 'All' || task.deptTo === filterDeptTo) &&
    (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     task.deptTo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Menunggu Persetujuan Atasan': return 'bg-purple-200 text-purple-800';
      case 'Menunggu Proses di Penerima': return 'bg-orange-200 text-orange-800';
      case 'Selesai': return 'bg-green-200 text-green-800';
      case 'Ditolak Penerima': return 'bg-red-200 text-red-800';
      case 'Ditolak Atasan': return 'bg-red-200 text-red-800';
      case 'Pengajuan Revisi': return 'bg-yellow-200 text-yellow-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const handleResubmitRevision = (taskId) => {
    alert(`Mengarahkan ke halaman revisi untuk tugas ID: ${taskId}`);
    // Contoh: navigate(`/task-exchange/ajukan-baru?revisiId=${taskId}`);
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
        <FaPaperPlane className="w-8 h-8 text-purple-500" />
        Tugas Saya (Yang Diajukan)
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lacak status dan riwayat semua tugas atau permintaan yang Anda ajukan ke departemen lain.
      </p>

      {/* Filter Tugas */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-purple-500">
        <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-purple-500" />
          Filter Tugas Saya
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-my-task" className="block text-gray-700 font-medium mb-1">Cari Tugas</label>
            <input
              type="text"
              id="search-my-task"
              placeholder="Judul Tugas, Dept. Tujuan..."
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
              <option value="Menunggu Persetujuan Atasan">Menunggu Persetujuan Atasan</option>
              <option value="Menunggu Proses di Penerima">Menunggu Proses di Penerima</option>
              <option value="Pengajuan Revisi">Pengajuan Revisi</option>
              <option value="Selesai">Selesai</option>
              <option value="Ditolak Penerima">Ditolak Penerima</option>
              <option value="Ditolak Atasan">Ditolak Atasan</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-dept-to" className="block text-gray-700 font-medium mb-1">Departemen Tujuan</label>
            <select
              id="filter-dept-to"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={filterDeptTo}
              onChange={(e) => setFilterDeptTo(e.target.value)}
            >
              <option value="All">Semua Departemen</option>
              <option value="Operasional">Operasional</option>
              <option value="HRD">HRD</option>
              <option value="Keuangan">Keuangan</option>
              <option value="IT">IT</option>
              <option value="Pemasaran">Pemasaran</option>
              <option value="Umum & Administrasi">Umum & Administrasi</option>
            </select>
          </div>
        </div>
      </section>

      {/* Tabel Tugas Saya */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Tugas Anda ({filteredTasks.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Judul Tugas</th>
                <th className="py-3 px-6 text-left">Departemen Tujuan</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Terakhir Diperbarui</th>
                <th className="py-3 px-6 text-center">Catatan/Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{task.title}</td>
                    <td className="py-3 px-6 text-left">{task.deptTo}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                        {task.status === 'Menunggu Persetujuan Atasan' && <FaClock className="inline-block mr-1" />}
                        {task.status === 'Menunggu Proses di Penerima' && <FaClock className="inline-block mr-1" />}
                        {task.status === 'Selesai' && <FaCheckCircle className="inline-block mr-1" />}
                        {task.status === 'Ditolak Penerima' && <FaTimesCircle className="inline-block mr-1" />}
                        {task.status === 'Ditolak Atasan' && <FaTimesCircle className="inline-block mr-1" />}
                        {task.status === 'Pengajuan Revisi' && <FaSyncAlt className="inline-block mr-1" />}
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{task.lastUpdate}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <a href={`/task-exchange/detail/${task.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                          <FaEye />
                        </a>
                        {task.status === 'Pengajuan Revisi' && (
                          <button onClick={() => handleResubmitRevision(task.id)} className="text-purple-500 hover:text-purple-700 text-lg" title="Ajukan Revisi">
                            <FaSyncAlt />
                          </button>
                        )}
                        {(task.status === 'Menunggu Persetujuan Atasan' || task.status === 'Menunggu Proses di Penerima') && (
                          <button className="text-red-500 hover:text-red-700 text-lg" title="Batalkan Pengajuan">
                            <FaTimes />
                          </button>
                        )}
                      </div>
                      {task.revisionNotes && <p className="text-xs text-gray-500 mt-1">Revisi: {task.revisionNotes}</p>}
                      {task.rejectionReason && <p className="text-xs text-gray-500 mt-1">Ditolak: {task.rejectionReason}</p>}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">Belum ada tugas yang Anda ajukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SubmittedTasksPage;