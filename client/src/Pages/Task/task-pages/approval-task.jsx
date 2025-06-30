import React, { useState, useEffect } from 'react';
import {
  FaCheckCircle, FaUserTie, FaSearch, FaFilter,
  FaEye, FaClipboardList, FaUserCheck, FaUserTimes,
  FaClock, FaSpinner, FaSyncAlt, FaExclamationCircle,
} from 'react-icons/fa';
import { useAuth } from '../../../Context/AuthContext';
import axiosClient from '../../../axiosClient';
import Swal from 'sweetalert2';

const ApprovalTaskPage = () => {
  const { user } = useAuth();
  const [tasksToApprove, setTasksToApprove] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterRequester, setFilterRequester] = useState('All');
  const [allRequesters, setAllRequesters] = useState([]);

  const [taskStatuses, setTaskStatuses] = useState([]);
  const [loadingStatuses, setLoadingStatuses] = useState(true);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-200 text-red-800';
      case 'Medium': return 'bg-orange-200 text-orange-800';
      case 'Normal': return 'bg-blue-200 text-blue-800';
      case 'Urgent': return 'bg-purple-200 text-purple-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  // Helper untuk mendapatkan ID status berdasarkan nama
  const getStatusIdByName = (name) => {
    const status = taskStatuses.find(s => s.name === name);
    return status ? status.id : null;
  };

  useEffect(() => {
    const fetchTaskStatuses = async () => {
      setLoadingStatuses(true);
      try {
        const response = await axiosClient.get('/tasks/task-statuses');
        setTaskStatuses(response.data);
      } catch (error) {
        console.error("Gagal memuat status tugas:", error.response || error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Gagal memuat daftar status tugas untuk proses persetujuan. Silakan refresh halaman.',
        });
      } finally {
        setLoadingStatuses(false);
      }
    };
    fetchTaskStatuses();
  }, []);

  useEffect(() => {
    if (!loadingStatuses) {
      fetchPendingApprovalTasks();
    }
  }, [searchTerm, filterPriority, filterRequester, loadingStatuses]);


  const fetchPendingApprovalTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/tasks/pending-approval', {
        params: {
          search: searchTerm,
          priority: filterPriority === 'All' ? null : filterPriority,
          requester_id: filterRequester === 'All' ? null : filterRequester,
        }
      });
      setTasksToApprove(response.data);

      const uniqueRequestersMap = new Map();
      response.data.forEach(task => {
        if (task.requester) {
          uniqueRequestersMap.set(task.requester.id, task.requester.name);
        }
      });
      const newAllRequesters = Array.from(uniqueRequestersMap, ([id, name]) => ({ id, name }));
      setAllRequesters(newAllRequesters);

    } catch (error) {
      console.error("Gagal memuat tugas menunggu persetujuan:", error.response || error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Gagal memuat daftar tugas menunggu persetujuan.',
      });
    } finally {
      setLoading(false);
    }
  };


  // --- Aksi Persetujuan SPV Departemen Pengaju ---
  const handleApprove = async (task) => {
    const result = await Swal.fire({
      title: 'Setujui Tugas Ini?',
      // Ubah teks konfirmasi agar lebih jelas
      text: `"${task.title}" akan disetujui dan diteruskan ke Departemen ${task.assignedToDepartment?.name} untuk proses penyerahan.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Setujui!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      // GANTI DARI 'Approved' MENJADI 'Pending Acceptance (Receiver)'
      // Ini adalah status yang menunjukkan bahwa tugas sudah disetujui oleh SPV Pengaju
      // dan sekarang menunggu tindakan dari Departemen Tujuan.
      const pendingAcceptanceStatusId = getStatusIdByName('Pending Acceptance (Receiver)'); 

      if (!pendingAcceptanceStatusId) {
        Swal.fire('Error', 'Status "Pending Acceptance (Receiver)" tidak ditemukan. Mohon hubungi admin.', 'error');
        return;
      }

      Swal.fire({
        title: 'Memproses...',
        html: 'Menyetujui tugas dan meneruskan ke departemen tujuan...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      try {
        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: pendingAcceptanceStatusId, // Menggunakan status baru
          approver_id: user.id, // User yang login adalah approver (SPV Pengaju)
          // `approved_at` bisa tetap di sini, menandakan kapan SPV pengaju menyetujui.
          approved_at: new Date().toISOString().slice(0, 19).replace('T', ' '), 
          last_action_by_id: user.id,
        });

        // Ubah pesan sukses agar lebih informatif
        Swal.fire('Disetujui!', 'Tugas berhasil disetujui dan diteruskan ke SPV Departemen Tujuan.', 'success');
        fetchPendingApprovalTasks(); // Refresh daftar tugas
      } catch (error) {
        console.error("Gagal menyetujui tugas:", error.response || error);
        let errorMessage = 'Gagal menyetujui tugas. Silakan coba lagi.';
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.errors) {
          errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        }
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };

  // --- Aksi Penolakan (tidak berubah) ---
  const handleReject = async (task) => {
    const { value: reason } = await Swal.fire({
      title: 'Tolak Tugas Ini?',
      input: 'textarea',
      inputLabel: `Berikan alasan penolakan untuk "${task.title}":`,
      inputPlaceholder: 'Alasan penolakan wajib diisi...',
      inputValidator: (value) => {
        if (!value) {
          return 'Alasan penolakan tidak boleh kosong!';
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Tolak',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#d33',
    });

    if (reason) {
      const rejectedStatusId = getStatusIdByName('Rejected (Supervisor)'); // Status ini sudah benar untuk penolakan SPV pengaju

      if (!rejectedStatusId) {
        Swal.fire('Error', 'Status "Rejected (Supervisor)" tidak ditemukan. Mohon hubungi admin.', 'error');
        return;
      }

      Swal.fire({
        title: 'Memproses...',
        html: 'Menolak tugas...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      try {
        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: rejectedStatusId,
          rejection_reason: reason,
          last_action_by_id: user.id,
        });

        Swal.fire('Ditolak!', 'Tugas berhasil ditolak.', 'success');
        fetchPendingApprovalTasks();
      } catch (error) {
        console.error("Gagal menolak tugas:", error.response || error);
        let errorMessage = 'Gagal menolak tugas. Silakan coba lagi.';
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.errors) {
          errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        }
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };

  // --- Aksi Permintaan Revisi (tidak berubah) ---
  const handleRequestRevision = async (task) => {
    const { value: notes } = await Swal.fire({
      title: 'Minta Revisi Tugas Ini?',
      input: 'textarea',
      inputLabel: `Berikan catatan revisi yang diperlukan untuk "${task.title}":`,
      inputPlaceholder: 'Catatan revisi wajib diisi...',
      inputValidator: (value) => {
        if (!value) {
          return 'Catatan revisi tidak boleh kosong!';
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Minta Revisi',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#ffc107',
    });

    if (notes) {
      const revisionStatusId = getStatusIdByName('Revision Requested'); 

      if (!revisionStatusId) {
        Swal.fire('Error', 'Status "Revision Requested" tidak ditemukan. Mohon hubungi admin.', 'error');
        return;
      }

      Swal.fire({
        title: 'Memproses...',
        html: 'Mengajukan revisi...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      try {
        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: revisionStatusId,
          revision_notes: notes,
          last_action_by_id: user.id,
        });

        Swal.fire('Revisi Diajukan!', 'Permintaan revisi tugas berhasil diajukan.', 'success');
        fetchPendingApprovalTasks(); 
      } catch (error) {
        console.error("Gagal mengajukan revisi tugas:", error.response || error);
        let errorMessage = 'Gagal mengajukan revisi tugas. Silakan coba lagi.';
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.errors) {
          errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        }
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };


  if (loading || loadingStatuses) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p>{loadingStatuses ? 'Memuat status tugas...' : 'Memuat tugas menunggu persetujuan...'}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-700 mb-8 flex items-center gap-3">
        <FaCheckCircle className="w-8 h-8 text-orange-500" />
        Daftar Tugas Menunggu Persetujuan
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Tinjau dan setujui pengajuan tugas dari staf di departemen Anda.
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
              {allRequesters.map((requester) => (
                <option key={requester.id} value={requester.id}>{requester.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Tabel Pengajuan Tugas */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Tugas Menunggu Persetujuan ({tasksToApprove.length})
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
              {tasksToApprove.length > 0 ? (
                tasksToApprove.map((task) => (
                  <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{task.title}</td>
                    <td className="py-3 px-6 text-left">{task.requester?.name} ({task.requested_by_department?.name})</td>
                    <td className="py-3 px-6 text-left">{task.assigned_to_department?.name}</td>
                    <td className="py-3 px-6 text-left">{task.deadline}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{new Date(task.created_at).toLocaleDateString('id-ID')}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <a href={`/task-exchange/detail/${task.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                          <FaEye />
                        </a>
                        <button onClick={() => handleApprove(task)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors mr-2">
                          Setujui
                        </button>
                        <button onClick={() => handleReject(task)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors mr-2">
                          Tolak
                        </button>
                        <button onClick={() => handleRequestRevision(task)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-yellow-600 transition-colors">
                          Revisi
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

export default ApprovalTaskPage;