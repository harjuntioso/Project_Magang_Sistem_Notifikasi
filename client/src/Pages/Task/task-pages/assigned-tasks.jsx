import React, { useState, useEffect } from 'react';
import {
  FaTasks, FaSearch, FaFilter, FaEye, FaPlayCircle,
  FaCheckCircle, FaExclamationCircle, FaSyncAlt, FaSpinner,
  FaClipboardList // Icon tambahan
} from 'react-icons/fa';
import { useAuth } from '../../../Context/AuthContext';
import axiosClient from '../../../axiosClient';
import Swal from 'sweetalert2';

const MyAssignedTasksPage = () => {
  const { user } = useAuth();
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('In Progress'); // Default filter untuk Officer
  const [filterPriority, setFilterPriority] = useState('All');

  // State untuk menyimpan daftar status tugas dari backend
  const [allTaskStatuses, setAllTaskStatuses] = useState([]);
  const [loadingStatuses, setLoadingStatuses] = useState(true);

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
      case 'Pending Acceptance (Receiver)': return 'bg-orange-200 text-orange-800'; // Mungkin tidak muncul di sini, tapi bagus jika ada
      case 'Accepted': return 'bg-blue-200 text-blue-800';
      case 'In Progress': return 'bg-purple-200 text-purple-800'; // Atau warna lain untuk 'Sedang Dikerjakan'
      case 'Completed': return 'bg-green-200 text-green-800';
      case 'Revision Requested': return 'bg-yellow-200 text-yellow-800';
      case 'Rejected (Receiver)': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };


  // Effect pertama: memuat status tugas
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

  // Effect kedua: memuat tugas saya
  useEffect(() => {
    // Pastikan user dan status task sudah dimuat sebelum fetch tasks
    if (user?.id && !loadingStatuses) {
      fetchMyTasks();
    } else if (!user?.id && user) {
      // User login tapi tidak punya ID (seharusnya tidak terjadi jika auth benar)
      Swal.fire('Info', 'Akun Anda tidak teridentifikasi. Tidak dapat memuat tugas.', 'info');
      setLoading(false);
    }
  }, [searchTerm, filterStatus, filterPriority, user?.id, loadingStatuses]);


  const fetchMyTasks = async () => {
    setLoading(true);
    try {
      const params = {
        assignee_id: user.id, // Filter kunci: tugas yang ditugaskan ke user ini
        status: filterStatus === 'All' ? null : filterStatus,
        search: searchTerm,
        priority: filterPriority === 'All' ? null : filterPriority,
      };

      const response = await axiosClient.get('/tasks/my-assigned', { params }); // Endpoint baru
      setMyTasks(response.data);
    } catch (error) {
      console.error("Gagal memuat tugas saya:", error.response || error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Gagal memuat daftar tugas Anda.',
      });
    } finally {
      setLoading(false);
    }
  };

  // --- Aksi 'Mulai Kerjakan' Tugas ---
  const handleStartTask = async (task) => {
    const result = await Swal.fire({
      title: 'Mulai Kerjakan Tugas Ini?',
      text: `Tugas "${task.title}" akan ditandai 'Sedang Dikerjakan'.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#007bff', // Blue
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Mulai!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      const inProgressStatusId = getStatusIdByName('In Progress');

      if (!inProgressStatusId) {
        Swal.fire('Error', 'Status "In Progress" tidak ditemukan. Hubungi admin.', 'error');
        return;
      }

      Swal.fire({ title: 'Memproses...', html: 'Memulai tugas...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      try {
        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: inProgressStatusId,
          // assignee_id tidak perlu diubah lagi karena sudah ditugaskan
          // assigned_at bisa diupdate jika perlu untuk menandai waktu mulai pengerjaan
          // actual_start_date: new Date().toISOString().slice(0, 19).replace('T', ' '), // Jika ada field ini di DB
          last_action_by_id: user.id,
        });

        Swal.fire('Berhasil!', 'Tugas ditandai sedang dikerjakan.', 'success');
        fetchMyTasks();
      } catch (error) {
        console.error("Gagal memulai tugas:", error.response || error);
        let errorMessage = 'Gagal memulai tugas. Silakan coba lagi.';
        if (error.response?.data?.message) errorMessage = error.response.data.message;
        else if (error.response?.data?.errors) errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };

  // --- Aksi 'Tandai Selesai' Tugas ---
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
          // actual_end_date: new Date().toISOString().slice(0, 19).replace('T', ' '), // Jika ada field ini di DB
          last_action_by_id: user.id,
        });
        Swal.fire('Selesai!', 'Tugas berhasil ditandai selesai.', 'success');
        fetchMyTasks();
      } catch (error) {
        console.error("Gagal menandai tugas selesai:", error.response || error);
        let errorMessage = 'Gagal menandai tugas selesai. Silakan coba lagi.';
        if (error.response?.data?.message) errorMessage = error.response.data.message;
        else if (error.response?.data?.errors) errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };

  // --- Aksi 'Minta Revisi' (dari Officer ke SPV Departemen Tujuan) ---
  const handleRequestRevisionOfficer = async (task) => {
    const { value: notes } = await Swal.fire({
      title: 'Minta Revisi Tugas Ini kepada SPV?',
      input: 'textarea',
      inputLabel: `Berikan catatan revisi yang diperlukan untuk "${task.title}" kepada SPV Anda:`,
      inputPlaceholder: 'Catatan revisi wajib diisi...',
      inputValidator: (value) => { if (!value) return 'Catatan revisi tidak boleh kosong!'; },
      showCancelButton: true, confirmButtonText: 'Minta Revisi', cancelButtonText: 'Batal', confirmButtonColor: '#ffc107',
    });

    if (notes) {
      // Status baru atau existing: 'Revision Requested by Officer' atau gunakan 'Revision Requested'
      // Jika 'Revision Requested' dipakai umum, maka di backend perlu logika siapa yang meminta revisi.
      const revisionRequestedOfficerStatusId = getStatusIdByName('Revision Requested'); // Asumsi menggunakan status ini

      if (!revisionRequestedOfficerStatusId) { Swal.fire('Error', 'Status "Revision Requested" tidak ditemukan. Hubungi admin.', 'error'); return; }

      Swal.fire({ title: 'Memproses...', html: 'Mengajukan revisi...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      try {
        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: revisionRequestedOfficerStatusId,
          revision_notes: notes, // Catatan revisi dari officer
          last_action_by_id: user.id, // Officer yang meminta revisi
        });
        Swal.fire('Revisi Diajukan!', 'Permintaan revisi tugas berhasil diajukan kepada SPV Anda.', 'success');
        fetchMyTasks();
      } catch (error) {
        console.error("Gagal mengajukan revisi tugas:", error.response || error);
        let errorMessage = 'Gagal mengajukan revisi tugas. Silakan coba lagi.';
        if (error.response?.data?.message) errorMessage = error.response.data.message;
        else if (error.response?.data?.errors) errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };


  if (loading || loadingStatuses) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p>{loadingStatuses ? 'Memuat status tugas...' : 'Memuat daftar tugas Anda...'}</p>
      </div>
    );
  }

  if (!user?.id) {
    return (
      <div className="p-8 bg-neutral-50 min-h-screen text-center text-gray-600">
        <p className="text-xl font-semibold mb-4">Akses Ditolak</p>
        <p>Anda perlu login untuk melihat tugas yang ditugaskan kepada Anda.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-8 flex items-center gap-3">
        <FaTasks className="w-8 h-8 text-green-500" />
        Daftar Tugas Saya
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lihat dan kelola tugas yang ditugaskan kepada Anda.
      </p>

      {/* Filter Tugas */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-green-500">
        <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-green-500" />
          Filter Tugas Saya
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-task" className="block text-gray-700 font-medium mb-1">Cari Tugas</label>
            <input
              type="text"
              id="search-task"
              placeholder="Judul, Pemohon, Kategori..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="In Progress">Sedang Dikerjakan</option>
              <option value="Accepted">Diterima (Belum Mulai)</option> {/* Officer menerima dari SPV, tapi belum mulai mengerjakan */}
              <option value="Revision Requested">Revisi Diminta</option>
              <option value="Completed">Selesai</option>
              <option value="All">Semua Status</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-priority" className="block text-gray-700 font-medium mb-1">Prioritas</label>
            <select
              id="filter-priority"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
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

      {/* Tabel Tugas Saya */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Tugas Saya ({myTasks.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Judul Tugas</th>
                <th className="py-3 px-6 text-left">Departemen Pengaju</th>
                <th className="py-3 px-6 text-left">Deadline</th>
                <th className="py-3 px-6 text-left">Prioritas</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Ditugaskan Pada</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {myTasks.length > 0 ? (
                myTasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{task.title}</td>
                    <td className="py-3 px-6 text-left">{task.requested_by_department?.name}</td>
                    <td className="py-3 px-6 text-left">{task.deadline}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getTaskRowStatusColor(task.current_status?.name)}`}>
                        {task.current_status?.name === 'Accepted' && <FaCheckCircle className="inline-block mr-1" />}
                        {task.current_status?.name === 'In Progress' && <FaSpinner className="inline-block mr-1 animate-spin" />}
                        {task.current_status?.name === 'Completed' && <FaCheckCircle className="inline-block mr-1" />}
                        {task.current_status?.name === 'Revision Requested' && <FaExclamationCircle className="inline-block mr-1" />}
                        {task.current_status?.name}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">
                      {task.assigned_at ? new Date(task.assigned_at).toLocaleDateString('id-ID') : '-'}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <a href={`/task-exchange/detail/${task.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                          <FaEye />
                        </a>
                        {/* Aksi berdasarkan Status Tugas */}
                        {task.current_status?.name === 'Accepted' && (
                          <button onClick={() => handleStartTask(task)} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600 transition-colors">
                            Mulai Kerjakan
                          </button>
                        )}
                        {task.current_status?.name === 'In Progress' && (
                          <>
                            <button onClick={() => handleMarkCompleted(task)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors">
                              Selesai
                            </button>
                            <button onClick={() => handleRequestRevisionOfficer(task)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-yellow-600 transition-colors">
                              Minta Revisi
                            </button>
                          </>
                        )}
                        {task.current_status?.name === 'Revision Requested' && (
                            <button onClick={() => handleStartTask(task)} className="bg-orange-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-orange-600 transition-colors">
                                Lanjutkan Revisi
                            </button>
                        )}
                        {/* Tugas Selesai/Ditolak tidak ada aksi langsung, mungkin hanya tombol "Arsipkan" atau detail */}
                        {(task.current_status?.name === 'Completed' || task.current_status?.name === 'Rejected (Receiver)') && (
                            <span className="text-gray-500 text-xs">Selesai/Ditolak</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada tugas untuk status "{filterStatus}".</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MyAssignedTasksPage;