import React, { useState } from 'react';
import {
  FaCheckCircle,     // Ikon utama
  FaUserTie,         // Untuk Supervisor
  FaSearch,          // Cari
  FaFilter,          // Filter
  FaEye,             // Lihat Detail
  FaClipboardList,   // Daftar tugas
  FaUserCheck,       // Setujui
  FaUserTimes,       // Tolak
  FaClock,           // Status
} from 'react-icons/fa';

const TaskApprovalPage = () => {
  const [tasksToApprove, setTasksToApprove] = useState([
    // Data dummy tugas menunggu persetujuan
    { id: 'TASK001', title: 'Permintaan Desain Poster Event', requester: 'Nama Officer A', deptRequester: 'Pemasaran', deptTo: 'Desain', deadline: '2025-06-20', priority: 'High', status: 'Menunggu Persetujuan Atasan', submittedAt: '2025-06-10 10:00' },
    { id: 'TASK002', title: 'Permintaan Data Absensi Karyawan', requester: 'Nama Officer B', deptRequester: 'Operasional', deptTo: 'HRD', deadline: '2025-06-15', priority: 'Normal', status: 'Menunggu Persetujuan Atasan', submittedAt: '2025-06-09 14:30' },
    { id: 'TASK003', title: 'Instalasi Software Desain Grafis', requester: 'Nama Officer C', deptRequester: 'Pemasaran', deptTo: 'IT', deadline: '2025-06-25', priority: 'Medium', status: 'Menunggu Persetujuan Atasan', submittedAt: '2025-06-11 09:00' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterRequester, setFilterRequester] = useState('All'); // Bisa difilter per Officer

  const filteredTasks = tasksToApprove.filter(task =>
    task.status === 'Menunggu Persetujuan Atasan' && // Hanya tampilkan yang statusnya ini
    (filterPriority === 'All' || task.priority === filterPriority) &&
    (filterRequester === 'All' || task.requester === filterRequester) &&
    (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     task.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
     task.deptTo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApprove = (id, title) => {
    if (window.confirm(`Setujui pengajuan tugas "${title}"?`)) {
      alert(`Tugas ID: ${id} disetujui dan diteruskan ke departemen tujuan.`);
      // Logika update status ke backend (dari 'Menunggu Persetujuan Atasan' menjadi 'Menunggu Proses di Penerima')
      setTasksToApprove(tasksToApprove.filter(task => task.id !== id)); // Hapus dari daftar menunggu
    }
  };

  const handleReject = (id, title) => {
    const reason = prompt(`Tolak pengajuan tugas "${title}"? Berikan alasan penolakan:`);
    if (reason) {
      alert(`Tugas ID: ${id} ditolak dengan alasan: ${reason}`);
      // Logika update status ke backend (dari 'Menunggu Persetujuan Atasan' menjadi 'Ditolak Atasan')
      setTasksToApprove(tasksToApprove.filter(task => task.id !== id)); // Hapus dari daftar menunggu
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-200 text-red-800';
      case 'Medium': return 'bg-orange-200 text-orange-800';
      case 'Normal': return 'bg-blue-200 text-blue-800';
      case 'Urgent': return 'bg-purple-200 text-purple-800'; // Warna tambahan
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-700 mb-8 flex items-center gap-3">
        <FaCheckCircle className="w-8 h-8 text-orange-500" />
        Tinjauan & Persetujuan Tugas
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Tinjau dan proses pengajuan tugas yang diajukan oleh staf di departemen Anda.
      </p>

      {/* Filter Tugas */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-orange-500">
        <h2 className="text-xl font-semibold mb-4 text-orange-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-orange-500" />
          Filter Pengajuan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-task" className="block text-gray-700 font-medium mb-1">Cari Tugas</label>
            <input
              type="text"
              id="search-task"
              placeholder="Judul, Pemohon, Dept. Tujuan..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-priority" className="block text-gray-700 font-medium mb-1">Prioritas</label>
            <select
              id="filter-priority"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="Urgent">Sangat Mendesak</option>
              <option value="High">Tinggi</option>
              <option value="Medium">Sedang</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-requester" className="block text-gray-700 font-medium mb-1">Pemohon</label>
            <select
              id="filter-requester"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={filterRequester}
              onChange={(e) => setFilterRequester(e.target.value)}
            >
              <option value="All">Semua Pemohon</option>
              <option value="Nama Officer A">Nama Officer A</option>
              <option value="Nama Officer B">Nama Officer B</option>
              {/* Tambahkan nama officer di bawah Supervisor ini */}
            </select>
          </div>
        </div>
      </section>

      {/* Tabel Pengajuan Tugas */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Tugas Menunggu Persetujuan ({filteredTasks.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Judul Tugas</th>
                <th className="py-3 px-6 text-left">Pemohon</th>
                <th className="py-3 px-6 text-left">Departemen Tujuan</th>
                <th className="py-3 px-6 text-left">Deadline</th>
                <th className="py-3 px-6 text-left">Prioritas</th>
                <th className="py-3 px-6 text-left">Diajukan Pada</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{task.title}</td>
                    <td className="py-3 px-6 text-left">{task.requester} ({task.deptRequester})</td>
                    <td className="py-3 px-6 text-left">{task.deptTo}</td>
                    <td className="py-3 px-6 text-left">{task.deadline}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{task.submittedAt}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <a href={`/task-exchange/detail/${task.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                          <FaEye />
                        </a>
                        <button onClick={() => handleApprove(task.id, task.title)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors mr-2">
                          Setujui
                        </button>
                        <button onClick={() => handleReject(task.id, task.title)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors">
                          Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada tugas menunggu persetujuan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TaskApprovalPage;