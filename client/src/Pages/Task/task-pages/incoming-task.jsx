import React, { useState } from 'react';
import {
  FaInbox,           // Ikon utama
  FaSearch,          // Cari
  FaFilter,          // Filter
  FaEye,             // Lihat Detail
  FaClipboardList,   // Daftar tugas
  FaCheckCircle,     // Terima
  FaTimesCircle,     // Tolak
  FaSyncAlt,         // Revisi
  FaUserTie,         // Ditugaskan Kepada
  FaClock,           // Menunggu
} from 'react-icons/fa';

const IncomingTasksPage = () => {
  // Contoh: Departemen yang login adalah 'IT'
  const myDepartment = 'IT';

  const [incomingTasks, setIncomingTasks] = useState([
    // Data dummy tugas yang ditujukan ke departemen ini
    { id: 'TASK003', title: 'Instalasi Software Desain Grafis', requester: 'Nama Officer C', deptRequester: 'Pemasaran', deptTo: 'IT', deadline: '2025-06-25', priority: 'Medium', status: 'Menunggu Proses di Penerima', submittedAt: '2025-06-11 09:00', assignedTo: null },
    { id: 'TASK008', title: 'Perbaikan Proyektor Ruang Rapat', requester: 'Supervisor Umum', deptRequester: 'Umum & Adm.', deptTo: 'IT', deadline: '2025-06-18', priority: 'High', status: 'Menunggu Proses di Penerima', submittedAt: '2025-06-11 11:00', assignedTo: null },
    { id: 'TASK009', title: 'Setting Jaringan Baru Area Karyawan', requester: 'Manager HRD', deptRequester: 'HRD', deptTo: 'IT', deadline: '2025-07-01', priority: 'Normal', status: 'Menunggu Proses di Penerima', submittedAt: '2025-06-08 10:00', assignedTo: null },
    { id: 'TASK010', title: 'Buat Akun Karyawan Baru', requester: 'Staff HRD', deptRequester: 'HRD', deptTo: 'IT', deadline: '2025-06-13', priority: 'Urgent', status: 'Ditolak', submittedAt: '2025-06-12 10:00', assignedTo: null, rejectionReason: 'Data karyawan belum lengkap' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Menunggu Proses di Penerima'); // Default: hanya menunggu
  const [filterPriority, setFilterPriority] = useState('All');

  const filteredTasks = incomingTasks.filter(task =>
    (filterStatus === 'All' || task.status === filterStatus) &&
    (filterPriority === 'All' || task.priority === filterPriority) &&
    (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     task.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
     task.deptRequester.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Menunggu Proses di Penerima': return 'bg-orange-200 text-orange-800';
      case 'Diterima & Sedang Dikerjakan': return 'bg-blue-200 text-blue-800';
      case 'Selesai': return 'bg-green-200 text-green-800';
      case 'Ditolak': return 'bg-red-200 text-red-800';
      case 'Pengajuan Revisi': return 'bg-yellow-200 text-yellow-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-orange-500';
      case 'Normal': return 'text-blue-500';
      case 'Urgent': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const handleAccept = (id, title) => {
    alert(`Tugas "${title}" diterima dan akan segera diproses.`);
    setIncomingTasks(incomingTasks.map(task =>
      task.id === id ? { ...task, status: 'Diterima & Sedang Dikerjakan', assignedTo: 'Nama IT Petugas' } : task
    ));
    // Logika update status ke backend
  };

  const handleReject = (id, title) => {
    const reason = prompt(`Tolak tugas "${title}"? Berikan alasan penolakan:`);
    if (reason) {
      alert(`Tugas ID: ${id} ditolak dengan alasan: ${reason}`);
      setIncomingTasks(incomingTasks.map(task =>
        task.id === id ? { ...task, status: 'Ditolak', rejectionReason: reason } : task
      ));
      // Logika update status ke backend
    }
  };

  const handleRequestRevision = (id, title) => {
    const notes = prompt(`Minta revisi untuk tugas "${title}". Berikan catatan revisi yang diperlukan:`);
    if (notes) {
      alert(`Permintaan revisi untuk tugas ID: ${id} telah dikirim.`);
      setIncomingTasks(incomingTasks.map(task =>
        task.id === id ? { ...task, status: 'Pengajuan Revisi', revisionNotes: notes } : task
      ));
      // Logika update status ke backend
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-3">
        <FaInbox className="w-8 h-8 text-blue-500" />
        Tugas Masuk ke Departemen {myDepartment}
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lihat daftar tugas yang diajukan ke departemen Anda, terima, tolak, atau minta revisi.
      </p>

      {/* Filter Tugas */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-blue-500" />
          Filter Tugas Masuk
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-task" className="block text-gray-700 font-medium mb-1">Cari Tugas</label>
            <input
              type="text"
              id="search-task"
              placeholder="Judul, Pemohon, Kategori..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Menunggu Proses di Penerima">Menunggu Proses</option>
              <option value="Diterima & Sedang Dikerjakan">Sedang Dikerjakan</option>
              <option value="Pengajuan Revisi">Pengajuan Revisi</option>
              <option value="Ditolak">Ditolak</option>
              <option value="Selesai">Selesai</option>
              <option value="All">Semua Status</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-priority" className="block text-gray-700 font-medium mb-1">Prioritas</label>
            <select
              id="filter-priority"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">Semua Prioritas</option>
              <option value="Urgent">Sangat Mendesak</option>
              <option value="High">Tinggi</option>
              <option value="Medium">Sedang</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
        </div>
      </section>

      {/* Tabel Tugas Masuk */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Tugas untuk Departemen {myDepartment} ({filteredTasks.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Judul Tugas</th>
                <th className="py-3 px-6 text-left">Pemohon</th>
                <th className="py-3 px-6 text-left">Deadline</th>
                <th className="py-3 px-6 text-left">Prioritas</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Ditugaskan Kepada</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{task.title}</td>
                    <td className="py-3 px-6 text-left">{task.requester} ({task.deptRequester})</td>
                    <td className="py-3 px-6 text-left">{task.deadline}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                        {task.status === 'Menunggu Proses di Penerima' && <FaClock className="inline-block mr-1" />}
                        {task.status === 'Diterima & Sedang Dikerjakan' && <FaCheckCircle className="inline-block mr-1" />}
                        {task.status === 'Pengajuan Revisi' && <FaSyncAlt className="inline-block mr-1" />}
                        {task.status === 'Ditolak' && <FaTimesCircle className="inline-block mr-1" />}
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{task.assignedTo || '-'}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <a href={`/task-exchange/detail/${task.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                          <FaEye />
                        </a>
                        {task.status === 'Menunggu Proses di Penerima' && (
                          <>
                            <button onClick={() => handleAccept(task.id, task.title)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors">Terima</button>
                            <button onClick={() => handleRequestRevision(task.id, task.title)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-yellow-600 transition-colors">Revisi</button>
                            <button onClick={() => handleReject(task.id, task.title)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors">Tolak</button>
                          </>
                        )}
                        {task.status === 'Diterima & Sedang Dikerjakan' && (
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600 transition-colors">Tandai Selesai</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada tugas masuk untuk status "{filterStatus}".</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default IncomingTasksPage;