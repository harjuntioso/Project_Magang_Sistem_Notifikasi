import React, { useState, useEffect } from 'react';
import {
  FaInbox, FaSearch, FaFilter, FaEye, FaClipboardList,
  FaCheckCircle, FaTimesCircle, FaSyncAlt, FaUserTie,
  FaClock, FaSpinner, FaExclamationCircle
} from 'react-icons/fa';
import { useAuth } from '../../../Context/AuthContext';
import axiosClient from '../../../axiosClient';
import Swal from 'sweetalert2';

const IncomingTasksPage = () => {
  const { user } = useAuth(); // User yang sedang login
  // State untuk daftar tugas masuk
  const [incomingTasks, setIncomingTasks] = useState([]);
  // State untuk loading
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingStatuses, setLoadingStatuses] = useState(true); // Loading untuk status tugas
  // State untuk filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Menunggu Proses di Penerima'); // Default filter
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterRequesterDept, setFilterRequesterDept] = useState('All'); // Filter berdasarkan departemen pengaju

  // State untuk menyimpan daftar status tugas dari backend
  const [allTaskStatuses, setAllTaskStatuses] = useState([]);

  // Dapatkan ID departemen user yang login (untuk filter di backend)
  const userDepartmentId = user?.department?.id;
  const userDepartmentName = user?.department?.name; // Untuk ditampilkan di judul

  // Helper untuk mendapatkan ID status berdasarkan nama
  const getStatusIdByName = (name) => {
    const status = allTaskStatuses.find(s => s.name === name);
    return status ? status.id : null;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-200 text-red-800';
      case 'Medium': return 'bg-orange-200 text-orange-800';
      case 'Normal': return 'bg-blue-200 text-blue-800';
      case 'Urgent': return 'bg-purple-200 text-purple-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getTaskRowStatusColor = (statusName) => {
    switch (statusName) {
      case 'Menunggu Proses di Penerima': return 'bg-orange-200 text-orange-800';
      case 'Diterima & Sedang Dikerjakan': return 'bg-blue-200 text-blue-800';
      case 'Selesai': return 'bg-green-200 text-green-800';
      case 'Ditolak': return 'bg-red-200 text-red-800';
      case 'Pengajuan Revisi': return 'bg-yellow-200 text-yellow-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  // EFFECT PERTAMA: Untuk memuat status tugas dari backend (sekali)
  useEffect(() => {
    const fetchTaskStatuses = async () => {
      setLoadingStatuses(true);
      try {
        const response = await axiosClient.get('/tasks/task-statuses');
        setAllTaskStatuses(response.data);
      } catch (error) {
        console.error("Gagal memuat status tugas:", error.response || error);
        Swal.fire('Error', 'Gagal memuat daftar status tugas.', 'error');
      } finally {
        setLoadingStatuses(false);
      }
    };
    fetchTaskStatuses();
  }, []);

  // EFFECT KEDUA: Untuk memuat tugas masuk (berjalan saat filter atau user berubah)
  useEffect(() => {
    // Pastikan user dan status task sudah dimuat sebelum fetch tasks
    if (userDepartmentId && !loadingStatuses) {
      fetchIncomingTasks();
    } else if (!userDepartmentId && user) { // User login tapi tidak punya department_id
        Swal.fire('Info', 'Akun Anda tidak terasosiasi dengan departemen. Tidak dapat memuat tugas masuk.', 'info');
        setLoadingTasks(false); // Hentikan loading
    }
  }, [searchTerm, filterStatus, filterPriority, filterRequesterDept, userDepartmentId, loadingStatuses]);


  const fetchIncomingTasks = async () => {
    setLoadingTasks(true);
    try {
      const params = {
        department_id: userDepartmentId, // Filter oleh departemen user yang login
        status: filterStatus === 'All' ? null : filterStatus,
        search: searchTerm,
        priority: filterPriority === 'All' ? null : filterPriority,
        // requester_department_id: filterRequesterDept === 'All' ? null : filterRequesterDept, // Jika ingin filter ini juga
      };
      
      // <<< Endpoint BARU untuk mengambil tugas masuk ke departemen user >>>
      const response = await axiosClient.get('/tasks/incoming-to-department', { params });
      setIncomingTasks(response.data);
    } catch (error) {
      console.error("Gagal memuat tugas masuk:", error.response || error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Gagal memuat daftar tugas masuk.',
      });
    } finally {
      setLoadingTasks(false);
    }
  };

  // --- Aksi 'Terima' Tugas ---
  const handleAccept = async (task) => {
    const result = await Swal.fire({
      title: 'Terima Tugas Ini?',
      text: `Tugas "${task.title}" akan diterima dan statusnya menjadi 'Sedang Dikerjakan'.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Terima!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      const acceptedStatusId = getStatusIdByName('Accepted');
      const inProgressStatusId = getStatusIdByName('In Progress'); // Bisa langsung ke In Progress

      if (!acceptedStatusId || !inProgressStatusId) {
        Swal.fire('Error', 'Status "Accepted" atau "In Progress" tidak ditemukan. Hubungi admin.', 'error');
        return;
      }

      Swal.fire({ title: 'Memproses...', html: 'Menerima tugas...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      try {
        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: acceptedStatusId, // Atau inProgressStatusId
          assignee_id: user.id, // Menugaskan ke user yang menerima
          assigned_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Waktu penugasan
          last_action_by_id: user.id,
        });

        Swal.fire('Diterima!', 'Tugas berhasil diterima dan ditugaskan kepada Anda.', 'success');
        fetchIncomingTasks(); // Refresh daftar tugas
      } catch (error) {
        console.error("Gagal menerima tugas:", error.response || error);
        let errorMessage = 'Gagal menerima tugas. Silakan coba lagi.';
        if (error.response?.data?.message) errorMessage = error.response.data.message;
        else if (error.response?.data?.errors) errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };

  // --- Aksi 'Tolak' Tugas ---
  const handleReject = async (task) => {
    const { value: reason } = await Swal.fire({
      title: 'Tolak Tugas Ini?',
      input: 'textarea',
      inputLabel: `Berikan alasan penolakan untuk "${task.title}":`,
      inputPlaceholder: 'Alasan penolakan wajib diisi...',
      inputValidator: (value) => { if (!value) return 'Alasan penolakan tidak boleh kosong!'; },
      showCancelButton: true, confirmButtonText: 'Tolak', cancelButtonText: 'Batal', confirmButtonColor: '#d33',
    });

    if (reason) {
      const rejectedStatusId = getStatusIdByName('Rejected (Receiver)');
      if (!rejectedStatusId) { Swal.fire('Error', 'Status "Rejected (Receiver)" tidak ditemukan. Hubungi admin.', 'error'); return; }

      Swal.fire({ title: 'Memproses...', html: 'Menolak tugas...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      try {
        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: rejectedStatusId,
          rejection_reason: reason,
          last_action_by_id: user.id,
        });
        Swal.fire('Ditolak!', 'Tugas berhasil ditolak.', 'success');
        fetchIncomingTasks();
      } catch (error) {
        console.error("Gagal menolak tugas:", error.response || error);
        let errorMessage = 'Gagal menolak tugas. Silakan coba lagi.';
        if (error.response?.data?.message) errorMessage = error.response.data.message;
        else if (error.response?.data?.errors) errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };

  // --- Aksi 'Revisi' Tugas ---
  const handleRequestRevision = async (task) => {
    const { value: notes } = await Swal.fire({
      title: 'Minta Revisi Tugas Ini?',
      input: 'textarea',
      inputLabel: `Berikan catatan revisi yang diperlukan untuk "${task.title}":`,
      inputPlaceholder: 'Catatan revisi wajib diisi...',
      inputValidator: (value) => { if (!value) return 'Catatan revisi tidak boleh kosong!'; },
      showCancelButton: true, confirmButtonText: 'Minta Revisi', cancelButtonText: 'Batal', confirmButtonColor: '#ffc107',
    });

    if (notes) {
      const revisionStatusId = getStatusIdByName('Revision Requested');
      if (!revisionStatusId) { Swal.fire('Error', 'Status "Revision Requested" tidak ditemukan. Hubungi admin.', 'error'); return; }

      Swal.fire({ title: 'Memproses...', html: 'Mengajukan revisi...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      try {
        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: revisionStatusId,
          revision_notes: notes,
          last_action_by_id: user.id,
        });
        Swal.fire('Revisi Diajukan!', 'Permintaan revisi tugas berhasil diajukan.', 'success');
        fetchIncomingTasks();
      } catch (error) {
        console.error("Gagal mengajukan revisi tugas:", error.response || error);
        let errorMessage = 'Gagal mengajukan revisi tugas. Silakan coba lagi.';
        if (error.response?.data?.message) errorMessage = error.response.data.message;
        else if (error.response?.data?.errors) errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };

  // --- Aksi 'Tandai Selesai' ---
  const handleMarkCompleted = async (task) => {
    const result = await Swal.fire({
      title: 'Tandai Tugas Ini Selesai?',
      text: `Tugas "${task.title}" akan ditandai sebagai 'Selesai'.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745', // Green
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, Selesai!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      const completedStatusId = getStatusIdByName('Completed');
      if (!completedStatusId) { Swal.fire('Error', 'Status "Completed" tidak ditemukan. Hubungi admin.', 'error'); return; }

      Swal.fire({ title: 'Memproses...', html: 'Menandai tugas selesai...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      try {
        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: completedStatusId,
          last_action_by_id: user.id,
        });
        Swal.fire('Selesai!', 'Tugas berhasil ditandai selesai.', 'success');
        fetchIncomingTasks();
      } catch (error) {
        console.error("Gagal menandai tugas selesai:", error.response || error);
        let errorMessage = 'Gagal menandai tugas selesai. Silakan coba lagi.';
        if (error.response?.data?.message) errorMessage = error.response.data.message;
        else if (error.response?.data?.errors) errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };


  if (loadingTasks || loadingStatuses) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p>{loadingStatuses ? 'Memuat status tugas...' : 'Memuat tugas masuk...'}</p>
      </div>
    );
  }

  // Tampilkan pesan jika user tidak punya departemen_id
  if (!userDepartmentId) {
    return (
      <div className="p-8 bg-neutral-50 min-h-screen text-center text-gray-600">
        <p className="text-xl font-semibold mb-4">Akses Ditolak</p>
        <p>Akun Anda tidak terasosiasi dengan departemen. Tidak dapat memuat tugas masuk.</p>
        <p className="text-sm mt-2">Mohon hubungi administrator sistem.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-3">
        <FaInbox className="w-8 h-8 text-blue-500" />
        Tugas Masuk ke Departemen {userDepartmentName} ({incomingTasks.length})
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
          {/* Tambahkan filter Departemen Pengaju jika diperlukan */}
          {/* <div>
            <label htmlFor="filter-requester-dept" className="block text-gray-700 font-medium mb-1">Departemen Pengaju</label>
            <select
              id="filter-requester-dept"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={filterRequesterDept}
              onChange={(e) => setFilterRequesterDept(e.target.value)}
            >
              <option value="All">Semua Departemen</option>
              {allDepartments.map(dep => <option key={dep.id} value={dep.id}>{dep.name}</option>)}
            </select>
          </div> */}
        </div>
      </section>

      {/* Tabel Tugas Masuk */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Tugas untuk Departemen {userDepartmentName} ({incomingTasks.length})
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
              {incomingTasks.length > 0 ? (
                incomingTasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{task.title}</td>
                    <td className="py-3 px-6 text-left">{task.requester?.name} ({task.requested_by_department?.name})</td>
                    <td className="py-3 px-6 text-left">{task.deadline}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getTaskRowStatusColor(task.current_status?.name)}`}>
                        {task.current_status?.name === 'Menunggu Proses di Penerima' && <FaClock className="inline-block mr-1" />}
                        {task.current_status?.name === 'Diterima & Sedang Dikerjakan' && <FaCheckCircle className="inline-block mr-1" />}
                        {task.current_status?.name === 'Pengajuan Revisi' && <FaSyncAlt className="inline-block mr-1" />}
                        {task.current_status?.name === 'Ditolak' && <FaTimesCircle className="inline-block mr-1" />}
                        {task.current_status?.name === 'Selesai' && <FaCheckCircle className="inline-block mr-1" />}
                        {task.current_status?.name}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{task.assignee?.name || '-'}</td> {/* Menampilkan assignee */}
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <a href={`/task-exchange/detail/${task.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                          <FaEye />
                        </a>
                        {/* Tombol Aksi berdasarkan Status */}
                        {task.current_status?.name === 'Menunggu Proses di Penerima' && (
                          <>
                            <button onClick={() => handleAccept(task)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors">Terima</button>
                            <button onClick={() => handleRequestRevision(task)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-yellow-600 transition-colors">Revisi</button>
                            <button onClick={() => handleReject(task)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors">Tolak</button>
                          </>
                        )}
                        {task.current_status?.name === 'Diterima & Sedang Dikerjakan' && (
                          <button onClick={() => handleMarkCompleted(task)} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600 transition-colors">Tandai Selesai</button>
                        )}
                        {task.current_status?.name === 'Pengajuan Revisi' && (
                          <button onClick={() => console.log('Buka form revisi untuk tugas:', task.id)} className="bg-purple-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-purple-600 transition-colors">Lihat Revisi</button>
                        )}
                        {(task.current_status?.name === 'Ditolak' || task.current_status?.name === 'Selesai') && (
                          <button className="text-gray-500 hover:text-gray-700 text-sm">Arsipkan</button>
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